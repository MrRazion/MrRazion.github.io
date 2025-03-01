document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const downloadButton = document.getElementById('downloadButton');

    // Инициализация Telegram Web App
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();

    // Telegram Bot API данные
    const botToken = '7503290167:AAG9eyNlI8NhlIaqRPshrMaJ1g3XE1BCXW0'; // Замените на ваш токен бота
    const fileId = 'BQACAgEAAxkBAAIBNWfC4HK9Fv56IGIdzAzZuQz49kT1AAIxBQACE0exRRT9ck0uE9XiNgQ'; // Замените на ваш file_id
    const fileName = 'standleoprivate2.61.apk'; // Имя файла для скачивания

    // Greeting Update
    function updateGreeting() {
        if (!greetingElement) return;
        const hours = new Date().getHours();
        const greetings = {
            morning: 'Доброе утро',
            afternoon: 'Добрый день',
            evening: 'Добрый вечер',
            night: 'Доброй ночи'
        };
        const userName = Telegram.WebApp.initDataUnsafe.user?.first_name || 'Пользователь';
        greetingElement.textContent = 
            `${hours < 12 ? greetings.morning : hours < 18 ? greetings.afternoon : hours < 22 ? greetings.evening : greetings.night}, ${userName}`;
    }
    updateGreeting();

    // Download Button
    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            try {
                const getFileUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;
                const response = await fetch(getFileUrl);
                const data = await response.json();

                if (!data.ok) {
                    throw new Error('Не удалось получить файл: ' + data.description);
                }

                const filePath = data.result.file_path;
                const downloadUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

                Telegram.WebApp.openLink(downloadUrl);
            } catch (error) {
                console.error('Ошибка:', error);
                Telegram.WebApp.showAlert('Не удалось скачать файл. Проверьте подключение или данные.');
            }
        });
    }

    // Animate Icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        setTimeout(() => icon.classList.add('visible'), index * 100);
    });
});