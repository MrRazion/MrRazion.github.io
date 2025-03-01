document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.getElementById('main-content');
    const greetingElement = document.getElementById('greeting');
    const downloadButton = document.getElementById('downloadButton');
    const downloadProgress = document.getElementById('downloadProgress');
    const progressBarDownload = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const fileFormatElement = document.getElementById('fileFormat');
    const fileNameElement = document.getElementById('fileName');

    // Loading Simulation
    if (progressBar && loadingScreen && mainContent) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    updateGreeting();
                }, 500);
            }
        }, 200);
    } else if (mainContent) {
        mainContent.style.display = 'block';
    }

    // Greeting Update
    function updateGreeting() {
        if (!greetingElement) return;
        const hours = new Date().getHours();
        const greetings = {
            morning: 'Доброе утро, Пользователь',
            afternoon: 'Добрый день, Пользователь',
            evening: 'Добрый вечер, Пользователь',
            night: 'Доброй ночи, Пользователь'
        };
        greetingElement.textContent = 
            hours < 12 ? greetings.morning :
            hours < 18 ? greetings.afternoon :
            hours < 22 ? greetings.evening : greetings.night;
    }

    // File Info (GitHub raw URL)
    const fileInfo = {
        url: 'https://raw.githubusercontent.com/MrRazion/MrRazion.github.io/main/files/standrise0.30.0.apk', // Прямая ссылка на файл
        name: 'standrise0.30.0.apk',
        type: 'application/vnd.android.package-archive'
    };

    if (fileFormatElement && fileNameElement) {
        fileFormatElement.innerHTML = `<strong>Формат файла:</strong> .apk`;
        fileNameElement.innerHTML = `<strong>Имя файла:</strong> ${fileInfo.name}`;
    }

    // Download Button - Прямое скачивание через GitHub raw URL
    if (downloadButton && downloadProgress && progressBarDownload && progressText) {
        downloadButton.addEventListener('click', async () => {
            downloadProgress.style.display = 'block';
            downloadButton.disabled = true;

            try {
                // Метод 1: Прямое скачивание через <a>
                const link = document.createElement('a');
                link.href = fileInfo.url;
                link.download = fileInfo.name;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Успешное скачивание
                setTimeout(() => {
                    downloadProgress.style.display = 'none';
                    downloadButton.disabled = false;
                }, 1000);
            } catch (error) {
                console.error('Прямое скачивание не сработало:', error);
                progressText.textContent = 'Пробуем другой способ...';

                // Метод 2: Скачивание через fetch и Blob
                try {
                    const response = await fetch(fileInfo.url, {
                        method: 'GET',
                        headers: { 'Accept': fileInfo.type }
                    });
                    if (!response.ok) throw new Error('Файл не найден на GitHub');

                    const totalBytes = parseInt(response.headers.get('content-length') || '0', 10);
                    const totalMB = (totalBytes / 1024 / 1024).toFixed(2);
                    let downloadedBytes = 0;

                    const reader = response.body.getReader();
                    const chunks = [];

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        chunks.push(value);
                        downloadedBytes += value.length;

                        const downloadedMB = (downloadedBytes / 1024 / 1024).toFixed(2);
                        const progressPercent = totalBytes ? ((downloadedBytes / totalBytes) * 100).toFixed(1) : 0;
                        progressBarDownload.style.width = `${progressPercent}%`;
                        progressText.textContent = `Скачано: ${downloadedMB} MB из ${totalMB} MB (${progressPercent}%)`;
                    }

                    const blob = new Blob(chunks, { type: fileInfo.type });
                    const downloadUrl = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = fileInfo.name;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);

                    downloadProgress.style.display = 'none';
                    downloadButton.disabled = false;
                } catch (error) {
                    console.error('Ошибка загрузки:', error);
                    progressText.textContent = 'Не удалось скачать файл. Проверьте URL.';
                    setTimeout(() => {
                        downloadProgress.style.display = 'none';
                        downloadButton.disabled = false;
                    }, 2000);
                }
            }
        });
    }

    // Animate Icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        setTimeout(() => icon.classList.add('visible'), index * 100);
    });
});