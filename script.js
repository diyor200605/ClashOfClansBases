/**
 * Clash of Clans Telegram Web App
 * Основная логика приложения
 */

// Инициализация Telegram Web App
let tg = null;
if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;
}

// Текущий выбранный уровень ратуши
let currentTH = null;

/**
 * Безопасное получение значения из Telegram API
 */
function safeTelegramCall(method, ...args) {
    if (tg && typeof tg[method] === 'function') {
        try {
            return tg[method](...args);
        } catch (e) {
            console.warn(`Telegram API error: ${method}`, e);
            return null;
        }
    }
    return null;
}

/**
 * Инициализация приложения
 */
function init() {
    // Инициализация Telegram Web App
    if (tg) {
        tg.ready();
        tg.expand();
        
        // Применение темы Telegram
        applyTelegramTheme();
        
        // Слушатель изменения темы
        tg.onEvent('themeChanged', applyTelegramTheme);
    }
    
    // Инициализация главного экрана
    initMainScreen();
    
    // Инициализация обработчиков
    initEventHandlers();
}

/**
 * Применение темы Telegram к приложению
 */
function applyTelegramTheme() {
    if (!tg) return;
    
    const theme = tg.colorScheme || 'dark'; // 'light' или 'dark'
    const bgColor = tg.backgroundColor || '#1a1a1a';
    const textColor = tg.headerColor || '#ffffff';
    
    // Обновление CSS переменных
    document.documentElement.style.setProperty('--bg-primary', bgColor);
    document.documentElement.style.setProperty('--text-primary', textColor);
    
    // Установка цвета фона для Telegram
    safeTelegramCall('setHeaderColor', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    safeTelegramCall('setBackgroundColor', theme === 'dark' ? '#1a1a1a' : '#ffffff');
}

/**
 * Инициализация главного экрана с кнопками уровней ратуши
 */
function initMainScreen() {
    const thGrid = document.getElementById('thGrid');
    thGrid.innerHTML = '';
    
    // Создание кнопок для уровней TH6-TH18
    for (let th = 6; th <= 18; th++) {
        const thButton = document.createElement('div');
        thButton.className = 'th-button';
        thButton.setAttribute('data-th', th);
        
        thButton.innerHTML = `
            <div class="th-number">TH${th}</div>
            <div class="th-label">Town Hall ${th}</div>
        `;
        
        thButton.addEventListener('click', () => selectTownHall(th));
        thGrid.appendChild(thButton);
    }
}

/**
 * Выбор уровня ратуши
 * @param {number} thLevel - Уровень ратуши
 */
function selectTownHall(thLevel) {
    currentTH = thLevel;
    const bases = getBasesForTH(thLevel);
    
    if (bases.length === 0) {
        const message = 'Базы для этого уровня ратуши пока не добавлены';
        if (tg) {
            safeTelegramCall('showAlert', message);
        } else {
            alert(message);
        }
        return;
    }
    
    // Переключение на экран списка баз
    showBasesScreen(thLevel, bases);
    
    // Вибрация (если поддерживается)
    if (tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
        try {
            tg.HapticFeedback.impactOccurred('light');
        } catch (e) {
            console.warn('HapticFeedback error', e);
        }
    }
}

/**
 * Отображение экрана со списком баз
 * @param {number} thLevel - Уровень ратуши
 * @param {Array} basesList - Список баз
 */
function showBasesScreen(thLevel, basesList) {
    // Обновление заголовков
    document.getElementById('basesTitle').textContent = `Базы TH${thLevel}`;
    document.getElementById('basesSubtitle').textContent = `Доступно баз: ${basesList.length}`;
    
    // Очистка списка баз
    const basesListContainer = document.getElementById('basesList');
    basesListContainer.innerHTML = '';
    
    // Создание карточек баз
    basesList.forEach(base => {
        const baseCard = createBaseCard(base);
        basesListContainer.appendChild(baseCard);
    });
    
    // Переключение экранов
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('basesScreen').classList.add('active');
}

/**
 * Экранирование HTML для безопасности
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Создание карточки базы
 * @param {Object} base - Объект базы
 * @returns {HTMLElement} Элемент карточки
 */
function createBaseCard(base) {
    const card = document.createElement('div');
    card.className = 'base-card';
    
    // Безопасное создание элементов
    const imageDiv = document.createElement('div');
    imageDiv.className = 'base-card-image';
    const img = document.createElement('img');
    img.src = base.imageUrl || '';
    img.alt = escapeHtml(base.name || '');
    img.onerror = function() { this.style.display = 'none'; };
    imageDiv.appendChild(img);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'base-card-content';
    
    const title = document.createElement('h3');
    title.className = 'base-card-title';
    title.textContent = base.name || '';
    
    const description = document.createElement('p');
    description.className = 'base-card-description';
    description.textContent = base.description || '';
    
    const button = document.createElement('button');
    button.className = 'base-card-button';
    button.setAttribute('data-base-id', base.id || '');
    button.textContent = 'Выбрать базу';
    button.addEventListener('click', () => importBase(base));
    
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(button);
    
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    
    return card;
}

/**
 * Импорт базы в игру через копирование ссылки
 * @param {Object} base - Объект базы
 */
function importBase(base) {
    // Вибрация
    if (tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
        try {
            tg.HapticFeedback.impactOccurred('medium');
        } catch (e) {
            console.warn('HapticFeedback error', e);
        }
    }
    
    // Получаем код базы или ссылку
    const shareCode = base.shareCode || base.id || '';
    let shareLink = base.shareLink || '';
    
    // НЕ используем deeplink - он не работает в браузерах
    // Если есть только shareCode, используем его для копирования
    // Если есть shareLink (официальная ссылка Clash of Clans), используем её
    
    if (!shareLink && !shareCode) {
        const errorMsg = 'Код базы не найден';
        if (tg && tg.showAlert) {
            tg.showAlert(errorMsg);
        } else {
            alert(errorMsg);
        }
        return;
    }
    
    // Копируем код базы или ссылку в буфер обмена
    // Приоритет: shareCode (если есть), иначе shareLink
    const textToCopy = shareCode || shareLink;
    
    copyToClipboard(textToCopy).then(() => {
        // Вибрация успеха
        if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
            try {
                tg.HapticFeedback.notificationOccurred('success');
            } catch (e) {
                console.warn('HapticFeedback error', e);
            }
        }
        
        // Показываем инструкции
        showImportInstructions(base.name, shareCode || shareLink, textToCopy);
    }).catch((err) => {
        console.error('Ошибка копирования:', err);
        // Показываем код/ссылку вручную с возможностью скопировать
        showImportInstructionsWithLink(base.name, textToCopy);
    });
}

/**
 * Проверка, является ли устройство мобильным
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
}

/**
 * Копирование текста в буфер обмена
 */
async function copyToClipboard(text) {
    // Для мобильных устройств в Telegram Web App используем специальный API
    if (tg && tg.ready && typeof tg.ready === 'function') {
        try {
            // В Telegram Web App можно использовать стандартный Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (err) {
            console.warn('Clipboard API failed in Telegram', err);
        }
    }
    
    // Стандартный Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('Clipboard API failed, trying fallback', err);
        }
    }
    
    // Fallback для старых браузеров и мобильных устройств
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '0';
    textArea.style.top = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('contenteditable', 'true');
    
    document.body.appendChild(textArea);
    
    // Для мобильных устройств
    if (isMobileDevice()) {
        textArea.contentEditable = true;
        textArea.readOnly = false;
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
    } else {
        textArea.focus();
        textArea.select();
    }
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        document.body.removeChild(textArea);
        throw err;
    }
}

/**
 * Показ инструкций по импорту базы
 */
function showImportInstructions(baseName, codeOrLink, copiedText) {
    const isMobile = isMobileDevice();
    const isLink = copiedText && (copiedText.startsWith('http') || copiedText.startsWith('https'));
    
    let message;
    if (isMobile) {
        if (isLink) {
            message = `✅ Ссылка скопирована!\n\n📱 Инструкция:\n1. Откройте Clash of Clans\n2. Нажмите на иконку редактирования базы (карандаш)\n3. Выберите "Импорт базы"\n4. Вставьте ссылку из буфера обмена\n\n💡 Или просто откройте ссылку в браузере.`;
        } else {
            message = `✅ Код базы "${codeOrLink}" скопирован!\n\n📱 Инструкция:\n1. Откройте Clash of Clans\n2. Нажмите на иконку редактирования базы (карандаш)\n3. Выберите "Импорт базы"\n4. Вставьте код "${codeOrLink}" из буфера обмена`;
        }
    } else {
        if (isLink) {
            message = `✅ Ссылка на базу "${baseName}" скопирована!\n\nИнструкция:\n1. Откройте Clash of Clans\n2. Перейдите в раздел "Базы"\n3. Нажмите "Импорт базы"\n4. Вставьте ссылку (Ctrl+V или Cmd+V)`;
        } else {
            message = `✅ Код базы "${codeOrLink}" скопирован!\n\nИнструкция:\n1. Откройте Clash of Clans\n2. Перейдите в раздел "Базы"\n3. Нажмите "Импорт базы"\n4. Вставьте код "${codeOrLink}" (Ctrl+V или Cmd+V)`;
        }
    }
    
    if (tg && tg.showAlert) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
}

/**
 * Показ инструкций с возможностью скопировать код/ссылку вручную
 */
function showImportInstructionsWithLink(baseName, codeOrLink) {
    const isMobile = isMobileDevice();
    const isLink = codeOrLink && (codeOrLink.startsWith('http') || codeOrLink.startsWith('https'));
    const label = isLink ? 'Ссылка' : 'Код базы';
    
    const message = `⚠️ Не удалось скопировать автоматически\n\n${label} на базу "${baseName}":\n\n${codeOrLink}\n\n${isMobile ? `📱 Выделите ${isLink ? 'ссылку' : 'код'} выше и скопируйте вручную, затем откройте Clash of Clans и вставьте в разделе "Импорт базы".` : `💻 Скопируйте ${isLink ? 'ссылку' : 'код'} выше (Ctrl+C), затем откройте Clash of Clans и вставьте в разделе "Импорт базы".`}`;
    
    if (tg && tg.showAlert) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
}

/**
 * Инициализация обработчиков событий
 */
function initEventHandlers() {
    // Кнопка "Назад"
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Переключение на главный экран
            document.getElementById('basesScreen').classList.remove('active');
            document.getElementById('mainScreen').classList.add('active');
            
            // Вибрация
            if (tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
                try {
                    tg.HapticFeedback.impactOccurred('light');
                } catch (e) {
                    console.warn('HapticFeedback error', e);
                }
            }
        });
    }
    
    // Обработка кнопки "Назад" в Telegram
    if (tg && tg.BackButton && tg.BackButton.onClick) {
        tg.BackButton.onClick(() => {
            if (document.getElementById('basesScreen').classList.contains('active')) {
                document.getElementById('basesScreen').classList.remove('active');
                document.getElementById('mainScreen').classList.add('active');
                if (tg.BackButton.hide) {
                    tg.BackButton.hide();
                }
            }
        });
    }
    
    // Показ кнопки "Назад" при переходе на экран баз
    if (tg && tg.BackButton) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'basesScreen' && mutation.target.classList.contains('active')) {
                    if (tg.BackButton.show) {
                        tg.BackButton.show();
                    }
                } else if (mutation.target.id === 'mainScreen' && mutation.target.classList.contains('active')) {
                    if (tg.BackButton.hide) {
                        tg.BackButton.hide();
                    }
                }
            });
        });
        
        const basesScreen = document.getElementById('basesScreen');
        const mainScreen = document.getElementById('mainScreen');
        
        if (basesScreen) {
            observer.observe(basesScreen, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
        
        if (mainScreen) {
            observer.observe(mainScreen, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
}

/**
 * Показать индикатор загрузки
 */
function showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
}

/**
 * Скрыть индикатор загрузки
 */
function hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Обработка ошибок изображений
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
    }
}, true);
