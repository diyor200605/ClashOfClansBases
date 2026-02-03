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
 * Импорт базы в игру через deeplink
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
    
    const message = `Импортировать базу "${base.name || 'базу'}" в Clash of Clans?`;
    
    // Показ подтверждения
    if (tg && tg.showConfirm) {
        tg.showConfirm(message, (confirmed) => {
            if (confirmed) {
                openDeeplink(base.deeplink);
            }
        });
    } else {
        if (confirm(message)) {
            openDeeplink(base.deeplink);
        }
    }
}

/**
 * Открытие deeplink
 */
function openDeeplink(deeplink) {
    if (!deeplink) return;
    
    // Открытие deeplink
    window.location.href = deeplink;
    
    // Альтернативный способ (если первый не сработал)
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = deeplink;
        link.click();
    }, 100);
    
    // Вибрация успеха
    if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
        try {
            tg.HapticFeedback.notificationOccurred('success');
        } catch (e) {
            console.warn('HapticFeedback error', e);
        }
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
