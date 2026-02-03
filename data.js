/**
 * База данных баз Clash of Clans
 * Структура: bases[TH_LEVEL] = массив баз
 * 
 * Для добавления новой базы просто добавьте объект в соответствующий массив
 */
const bases = {
    // Town Hall 6
    6: [
        {
            id: 'th6_base_1',
            name: 'Балансированная база TH6',
            description: 'Сбалансированная защита для всех типов атак',
            imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=TH6+Base+1',
            shareCode: 'TH6-BASE-001',
            shareLink: 'https://link.clashofclans.com/?action=OpenLayout&id=TH6-BASE-001'
        },
        {
            id: 'th6_base_2',
            name: 'Анти-гигант база',
            description: 'Оптимизирована против атак гигантами',
            imageUrl: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=TH6+Base+2',
            shareCode: 'THth6_base_2'
        },
        {
            id: 'th6_base_3',
            name: 'Хибиридная защита',
            description: 'Комбинация защиты от наземных и воздушных атак',
            imageUrl: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=TH6+Base+3',
            shareCode: 'THth6_base_3'
        }
    ],
    
    // Town Hall 7
    7: [
        {
            id: 'th7_base_1',
            name: 'Классическая база TH7',
            description: 'Проверенная временем база для Town Hall 7',
            imageUrl: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=TH7+Base+1',
            shareCode: 'THth7_base_1'
        },
        {
            id: 'th7_base_2',
            name: 'Анти-дракон база',
            description: 'Специальная защита против драконов',
            imageUrl: 'https://via.placeholder.com/400x300/00f2fe/ffffff?text=TH7+Base+2',
            shareCode: 'THth7_base_2'
        },
        {
            id: 'th7_base_3',
            name: 'База с центральной ратушей',
            description: 'Ратуша в центре для максимальной защиты',
            imageUrl: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=TH7+Base+3',
            shareCode: 'THth7_base_3'
        },
        {
            id: 'th7_base_4',
            name: 'Фермерская база',
            description: 'Оптимизирована для защиты ресурсов',
            imageUrl: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=TH7+Base+4',
            shareCode: 'THth7_base_4'
        }
    ],
    
    // Town Hall 8
    8: [
        {
            id: 'th8_base_1',
            name: 'Троянская база',
            description: 'База с ловушками и скрытыми защитными структурами',
            imageUrl: 'https://via.placeholder.com/400x300/fee140/000000?text=TH8+Base+1',
            shareCode: 'THth8_base_1'
        },
        {
            id: 'th8_base_2',
            name: 'Анти-ГоВиПе база',
            description: 'Защита от атак Голем+Ведьма+Пекка',
            imageUrl: 'https://via.placeholder.com/400x300/30cfd0/ffffff?text=TH8+Base+2',
            shareCode: 'THth8_base_2'
        },
        {
            id: 'th8_base_3',
            name: 'База с разделёнными отсеками',
            description: 'Множество отсеков для замедления атак',
            imageUrl: 'https://via.placeholder.com/400x300/330867/ffffff?text=TH8+Base+3',
            shareCode: 'THth8_base_3'
        }
    ],
    
    // Town Hall 9
    9: [
        {
            id: 'th9_base_1',
            name: 'Легендарная база TH9',
            description: 'Одна из лучших баз для Town Hall 9',
            imageUrl: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=TH9+Base+1',
            shareCode: 'THth9_base_1'
        },
        {
            id: 'th9_base_2',
            name: 'Анти-Лавалун база',
            description: 'Специальная защита против лавалунов',
            imageUrl: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=TH9+Base+2',
            shareCode: 'THth9_base_2'
        },
        {
            id: 'th9_base_3',
            name: 'Варварская база',
            description: 'База с максимальной защитой королевы',
            imageUrl: 'https://via.placeholder.com/400x300/ffe66d/000000?text=TH9+Base+3',
            shareCode: 'THth9_base_3'
        },
        {
            id: 'th9_base_4',
            name: 'Хибиридная база TH9',
            description: 'Универсальная защита от всех типов атак',
            imageUrl: 'https://via.placeholder.com/400x300/95e1d3/ffffff?text=TH9+Base+4',
            shareCode: 'THth9_base_4'
        }
    ],
    
    // Town Hall 10
    10: [
        {
            id: 'th10_base_1',
            name: 'Инферно база',
            description: 'База с оптимальным размещением инферно-башен',
            imageUrl: 'https://via.placeholder.com/400x300/aa4b6b/ffffff?text=TH10+Base+1',
            shareCode: 'THth10_base_1'
        },
        {
            id: 'th10_base_2',
            name: 'Анти-Боулер база',
            description: 'Защита от атак с использованием Боулера',
            imageUrl: 'https://via.placeholder.com/400x300/6b6b83/ffffff?text=TH10+Base+2',
            shareCode: 'THth10_base_2'
        },
        {
            id: 'th10_base_3',
            name: 'База с защитой орлов',
            description: 'Оптимальное размещение орла-артиллерии',
            imageUrl: 'https://via.placeholder.com/400x300/3b8d99/ffffff?text=TH10+Base+3',
            shareCode: 'THth10_base_3'
        }
    ],
    
    // Town Hall 11
    11: [
        {
            id: 'th11_base_1',
            name: 'Элитная база TH11',
            description: 'Профессиональная база для высокого уровня',
            imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=TH11+Base+1',
            shareCode: 'THth11_base_1'
        },
        {
            id: 'th11_base_2',
            name: 'Анти-Э-Драгон база',
            description: 'Защита от электрических драконов',
            imageUrl: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=TH11+Base+2',
            shareCode: 'THth11_base_2'
        },
        {
            id: 'th11_base_3',
            name: 'База с защитой великана',
            description: 'Оптимизирована против атак великаном',
            imageUrl: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=TH11+Base+3',
            shareCode: 'THth11_base_3'
        }
    ],
    
    // Town Hall 12
    12: [
        {
            id: 'th12_base_1',
            name: 'Титановая база',
            description: 'Максимальная защита для Town Hall 12',
            imageUrl: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=TH12+Base+1',
            shareCode: 'THth12_base_1'
        },
        {
            id: 'th12_base_2',
            name: 'Анти-Эдич база',
            description: 'Защита от атак Эдичем',
            imageUrl: 'https://via.placeholder.com/400x300/00f2fe/ffffff?text=TH12+Base+2',
            shareCode: 'THth12_base_2'
        },
        {
            id: 'th12_base_3',
            name: 'База с гига-ловушками',
            description: 'Оптимальное использование гига-ловушек',
            imageUrl: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=TH12+Base+3',
            shareCode: 'THth12_base_3'
        }
    ],
    
    // Town Hall 13
    13: [
        {
            id: 'th13_base_1',
            name: 'Легендарная база TH13',
            description: 'Элитная база для продвинутых игроков',
            imageUrl: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=TH13+Base+1',
            shareCode: 'THth13_base_1'
        },
        {
            id: 'th13_base_2',
            name: 'Анти-Супер-Ведьма база',
            description: 'Защита от супер-ведьм',
            imageUrl: 'https://via.placeholder.com/400x300/fee140/000000?text=TH13+Base+2',
            shareCode: 'THth13_base_2'
        },
        {
            id: 'th13_base_3',
            name: 'База с защитой короля-скелета',
            description: 'Оптимальная защита от короля-скелета',
            imageUrl: 'https://via.placeholder.com/400x300/30cfd0/ffffff?text=TH13+Base+3',
            shareCode: 'THth13_base_3'
        }
    ],
    
    // Town Hall 14
    14: [
        {
            id: 'th14_base_1',
            name: 'Эпическая база TH14',
            description: 'Мощная база для Town Hall 14',
            imageUrl: 'https://via.placeholder.com/400x300/330867/ffffff?text=TH14+Base+1',
            shareCode: 'THth14_base_1'
        },
        {
            id: 'th14_base_2',
            name: 'Анти-Супер-Варвар база',
            description: 'Защита от супер-варваров',
            imageUrl: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=TH14+Base+2',
            shareCode: 'THth14_base_2'
        },
        {
            id: 'th14_base_3',
            name: 'База с защитой петуха',
            description: 'Оптимальное размещение петуха',
            imageUrl: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=TH14+Base+3',
            shareCode: 'THth14_base_3'
        }
    ],
    
    // Town Hall 15
    15: [
        {
            id: 'th15_base_1',
            name: 'Ультимативная база TH15',
            description: 'Максимальная защита для Town Hall 15',
            imageUrl: 'https://via.placeholder.com/400x300/ffe66d/000000?text=TH15+Base+1',
            shareCode: 'THth15_base_1'
        },
        {
            id: 'th15_base_2',
            name: 'Анти-Рут база',
            description: 'Защита от атак Рут-райдером',
            imageUrl: 'https://via.placeholder.com/400x300/95e1d3/ffffff?text=TH15+Base+2',
            shareCode: 'THth15_base_2'
        },
        {
            id: 'th15_base_3',
            name: 'База с защитой монолита',
            description: 'Оптимальное размещение монолита',
            imageUrl: 'https://via.placeholder.com/400x300/aa4b6b/ffffff?text=TH15+Base+3',
            shareCode: 'THth15_base_3'
        }
    ],
    
    // Town Hall 16
    16: [
        {
            id: 'th16_base_1',
            name: 'Легендарная база TH16',
            description: 'Элитная база для максимального уровня',
            imageUrl: 'https://via.placeholder.com/400x300/6b6b83/ffffff?text=TH16+Base+1',
            shareCode: 'THth16_base_1'
        },
        {
            id: 'th16_base_2',
            name: 'Анти-Супер-Минион база',
            description: 'Защита от супер-минионов',
            imageUrl: 'https://via.placeholder.com/400x300/3b8d99/ffffff?text=TH16+Base+2',
            shareCode: 'THth16_base_2'
        },
        {
            id: 'th16_base_3',
            name: 'База с защитой тотема',
            description: 'Оптимальное размещение тотема',
            imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=TH16+Base+3',
            shareCode: 'THth16_base_3'
        }
    ],
    
    // Town Hall 17
    17: [
        {
            id: 'th17_base_1',
            name: 'Эпическая база TH17',
            description: 'Мощная база для Town Hall 17',
            imageUrl: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=TH17+Base+1',
            shareCode: 'THth17_base_1'
        },
        {
            id: 'th17_base_2',
            name: 'Анти-Супер-Волк база',
            description: 'Защита от супер-волков',
            imageUrl: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=TH17+Base+2',
            shareCode: 'THth17_base_2'
        },
        {
            id: 'th17_base_3',
            name: 'База с защитой дракона',
            description: 'Оптимальная защита от драконов',
            imageUrl: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=TH17+Base+3',
            shareCode: 'THth17_base_3'
        }
    ],
    
    // Town Hall 18
    18: [
        {
            id: 'th18_base_1',
            name: 'Ультимативная база TH18',
            description: 'Самая мощная база для максимального уровня',
            imageUrl: 'https://via.placeholder.com/400x300/00f2fe/ffffff?text=TH18+Base+1',
            shareCode: 'THth18_base_1'
        },
        {
            id: 'th18_base_2',
            name: 'Анти-все база',
            description: 'Универсальная защита от всех типов атак',
            imageUrl: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=TH18+Base+2',
            shareCode: 'THth18_base_2'
        },
        {
            id: 'th18_base_3',
            name: 'Легендарная защита',
            description: 'Профессиональная база для топ-игроков',
            imageUrl: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=TH18+Base+3',
            shareCode: 'THth18_base_3'
        }
    ]
};

/**
 * Получить список баз для определённого уровня ратуши
 * @param {number} thLevel - Уровень ратуши (6-18)
 * @returns {Array} Массив баз или пустой массив
 */
function getBasesForTH(thLevel) {
    return bases[thLevel] || [];
}

/**
 * Получить базу по ID
 * @param {string} baseId - ID базы
 * @returns {Object|null} Объект базы или null
 */
function getBaseById(baseId) {
    for (const thLevel in bases) {
        const base = bases[thLevel].find(b => b.id === baseId);
        if (base) return base;
    }
    return null;
}
