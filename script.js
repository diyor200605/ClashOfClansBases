/**
 * Clash of Clans Telegram Web App
 * Основная логика приложения
 */

// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;

// Текущий выбранный уровень ратуши
let currentTH = null;

/**
 * Инициализация приложения
 */
function init() {
    // Инициализация Telegram Web App
    tg.ready();
    tg.expand();
    
    // Применение темы Telegram
    applyTelegramTheme();
    
    // Слушатель изменения темы
    tg.onEvent('themeChanged', applyTelegramTheme);
    
    // Инициализация главного экрана
    initMainScreen();
    
    // Инициализация обработчиков
    initEventHandlers();
}

/**
 * Применение темы Telegram к приложению
 */
function applyTelegramTheme() {
    const theme = tg.colorScheme; // 'light' или 'dark'
    const bgColor = tg.backgroundColor || '#ffffff';
    const textColor = tg.headerColor || '#000000';
    
    // Обновление CSS переменных
    document.documentElement.style.setProperty('--bg-primary', bgColor);
    document.documentElement.style.setProperty('--text-primary', textColor);
    
    // Установка цвета фона для Telegram
    tg.setHeaderColor(theme === 'dark' ? '#1a1a1a' : '#ffffff');
    tg.setBackgroundColor(theme === 'dark' ? '#1a1a1a' : '#ffffff');
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
        tg.showAlert('Базы для этого уровня ратуши пока не добавлены');
        return;
    }
    
    // Переключение на экран списка баз
    showBasesScreen(thLevel, bases);
    
    // Вибрация (если поддерживается)
    tg.HapticFeedback.impactOccurred('light');
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
 * Создание карточки базы
 * @param {Object} base - Объект базы
 * @returns {HTMLElement} Элемент карточки
 */
function createBaseCard(base) {
    const card = document.createElement('div');
    card.className = 'base-card';
    
    card.innerHTML = `
        <div class="base-card-image">
            <img src="${base.imageUrl}" alt="${base.name}" onerror="this.style.display='none'">
        </div>
        <div class="base-card-content">
            <h3 class="base-card-title">${base.name}</h3>
            <p class="base-card-description">${base.description}</p>
            <button class="base-card-button" data-base-id="${base.id}">
                Выбрать базу
            </button>
        </div>
    `;
    
    // Обработчик клика на кнопку
    const button = card.querySelector('.base-card-button');
    button.addEventListener('click', () => importBase(base));
    
    return card;
}

/**
 * Импорт базы в игру через deeplink
 * @param {Object} base - Объект базы
 */
function importBase(base) {
    // Вибрация
    tg.HapticFeedback.impactOccurred('medium');
    
    // Показ подтверждения
    tg.showConfirm(
        `Импортировать базу "${base.name}" в Clash of Clans?`,
        (confirmed) => {
            if (confirmed) {
                // Открытие deeplink
                window.location.href = base.deeplink;
                
                // Альтернативный способ (если первый не сработал)
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = base.deeplink;
                    link.click();
                }, 100);
                
                // Вибрация успеха
                tg.HapticFeedback.notificationOccurred('success');
            }
        }
    );
}

/**
 * Инициализация обработчиков событий
 */
function initEventHandlers() {
    // Кнопка "Назад"
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        // Переключение на главный экран
        document.getElementById('basesScreen').classList.remove('active');
        document.getElementById('mainScreen').classList.add('active');
        
        // Вибрация
        tg.HapticFeedback.impactOccurred('light');
    });
    
    // Обработка кнопки "Назад" в Telegram
    tg.BackButton.onClick(() => {
        if (document.getElementById('basesScreen').classList.contains('active')) {
            document.getElementById('basesScreen').classList.remove('active');
            document.getElementById('mainScreen').classList.add('active');
            tg.BackButton.hide();
        }
    });
    
    // Показ кнопки "Назад" при переходе на экран баз
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'basesScreen' && mutation.target.classList.contains('active')) {
                tg.BackButton.show();
            } else if (mutation.target.id === 'mainScreen' && mutation.target.classList.contains('active')) {
                tg.BackButton.hide();
            }
        });
    });
    
    observer.observe(document.getElementById('basesScreen'), {
        attributes: true,
        attributeFilter: ['class']
    });
    
    observer.observe(document.getElementById('mainScreen'), {
        attributes: true,
        attributeFilter: ['class']
    });
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
