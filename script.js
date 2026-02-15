// Ждем загрузку DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }
    
    // Обработчик кнопки темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });
    }
    
    // Функция обновления текста кнопки
    function updateThemeButton(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️ Светлая тема' : '🌙 Темная тема';
        }
    }
    
    // ===== ФОРМА ОБРАТНОЙ СВЯЗИ =====
    const feedbackForm = document.getElementById('feedback-form');
    const formMessage = document.getElementById('form-message');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                showFormMessage('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Имитация отправки (в реальности здесь был бы fetch запрос)
            console.log('Отправка формы:', { name, email, message });
            
            // Показываем сообщение об успехе
            showFormMessage('Спасибо! Ваше сообщение отправлено.', 'success');
            
            // Очищаем форму
            feedbackForm.reset();
        });
    }
    
    // Вспомогательная функция валидации email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Функция показа сообщения формы
    function showFormMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'form-message ' + type;
            
            // Автоматически скрываем через 5 секунд
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // ===== ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ =====
    // Эта функция уже работает через класс active в HTML
    // Но можно добавить автоматическое определение текущей страницы
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});