// Основная логика приложения
class LagarShopApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Показываем загрузочный экран
            this.showLoadingProgress(10);
            
            // Инициализируем Telegram WebApp
            this.tg = window.Telegram.WebApp;
            
            // Устанавливаем полноэкранный режим
            if (this.tg.isFullscreen !== undefined) {
                this.tg.expand();
            }
            
            this.showLoadingProgress(30);
            
            // Проверяем данные инициализации
            const authValid = await validateInitData(this.tg.initData);
            if (!authValid) {
                throw new Error('Invalid initialization data');
            }
            
            this.showLoadingProgress(50);
            
            // Загружаем данные пользователя
            await this.loadUserData();
            
            this.showLoadingProgress(80);
            
            // Загружаем подарки пользователя
            await this.loadUserGifts();
            
            this.showLoadingProgress(100);
            
            // Скрываем загрузочный экран и показываем приложение
            setTimeout(() => {
                this.hideLoadingScreen();
                this.showApp();
                this.setupEventListeners();
            }, 500);
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Ошибка загрузки приложения');
        }
    }

    showLoadingProgress(percent) {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
    }

    showApp() {
        const app = document.getElementById('app');
        app.classList.remove('hidden');
        
        // Показываем кнопку выхода, если поддерживается
        if (this.tg.isFullscreen !== undefined && this.tg.isFullscreen) {
            const exitBtn = document.getElementById('exit-fullscreen');
            exitBtn.classList.remove('hidden');
        }
    }

    async loadUserData() {
        try {
            const user = this.tg.initDataUnsafe.user;
            
            // Устанавливаем приветствие
            this.setGreeting();
            
            // Устанавливаем имя пользователя
            if (user.first_name) {
                const userNameElement = document.getElementById('user-name');
                userNameElement.textContent = user.first_name;
            }
            
            // Устанавливаем аватар
            if (user.photo_url) {
                const userAvatar = document.getElementById('user-avatar');
                userAvatar.src = user.photo_url;
            }
            
            // Загружаем баланс
            const balance = await fetchUserBalance();
            const balanceElement = document.getElementById('balance');
            balanceElement.textContent = balance;
            
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    setGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('greeting');
        let greeting;
        
        if (hour >= 5 && hour < 12) greeting = "Доброе утро";
        else if (hour >= 12 && hour < 17) greeting = "Добрый день";
        else if (hour >= 17 && hour < 21) greeting = "Добрый вечер";
        else greeting = "Доброй ночи";
        
        greetingElement.textContent = greeting;
    }

    async loadUserGifts() {
        try {
            const gifts = await fetchUserGifts();
            this.renderGifts(gifts);
        } catch (error) {
            console.error('Error loading gifts:', error);
        }
    }

    renderGifts(gifts) {
        const container = document.getElementById('gifts-container');
        container.innerHTML = '';
        
        gifts.forEach(gift => {
            const giftElement = document.createElement('div');
            giftElement.classList.add('gift-item', 'squircle');
            
            giftElement.innerHTML = `
                <img src="${gift.image_url}" alt="${gift.name}" class="gift-image">
                <div class="gift-name">${gift.name}</div>
                <div class="gift-id">#${gift.id}</div>
                <div class="gift-price squircle">${this.calculatePrice(gift.base_price)} LC</div>
            `;
            
            container.appendChild(giftElement);
        });
    }

    calculatePrice(basePrice) {
        // Увеличиваем цену на 10% относительно базовой
        return Math.round(basePrice * 1.1);
    }

    setupEventListeners() {
        // Кнопка выхода из полноэкранного режима
        const exitBtn = document.getElementById('exit-fullscreen');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                if (this.tg.exitFullscreen !== undefined) {
                    this.tg.exitFullscreen();
                    exitBtn.classList.add('hidden');
                }
            });
        }
        
        // Обновляем приветствие каждые 30 минут
        setInterval(() => this.setGreeting(), 1800000);
        
        // Обработчики для поиска и фильтров
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch, 300));
        }
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        // Здесь будет логика поиска
        console.log('Searching for:', searchTerm);
    }

    handleFilter(button) {
        const filterType = button.textContent.toLowerCase();
        // Здесь будет логика фильтрации
        console.log('Filtering by:', filterType);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showError(message) {
        // Простая реализация показа ошибок
        alert(message);
    }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new LagarShopApp();
});