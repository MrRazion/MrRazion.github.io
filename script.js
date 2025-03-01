document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.getElementById('main-content');
    const greetingElement = document.getElementById('greeting');
    const downloadButton = document.getElementById('downloadButton');
    const menuButton = document.getElementById('menuButton');
    const devBanner = document.getElementById('devBanner');
    const downloadProgress = document.getElementById('downloadProgress');
    const progressBarDownload = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

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

    // Download Button with Full File Loading from GitHub
    if (downloadButton && downloadProgress && progressBarDownload && progressText) {
        downloadButton.addEventListener('click', async () => {
            const fileUrl = 'https://raw.githubusercontent.com/MrRazion/MrRazion.github.io/main/files/standrise0.30.0.apk'; // GitHub raw URL

            // Показываем прогресс-бар
            downloadProgress.style.display = 'block';
            downloadButton.disabled = true;

            try {
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error('Не удалось загрузить файл с GitHub');

                const totalBytes = parseInt(response.headers.get('content-length') || '0', 10);
                const totalMB = (totalBytes / 1024 / 1024).toFixed(2); // Переводим в MB
                let downloadedBytes = 0;

                const reader = response.body.getReader();
                const chunks = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    chunks.push(value);
                    downloadedBytes += value.length;

                    const downloadedMB = (downloadedBytes / 1024 / 1024).toFixed(2);
                    const progressPercent = totalBytes ? (downloadedBytes / totalBytes) * 100 : 0;
                    progressBarDownload.style.width = `${progressPercent}%`;
                    progressText.textContent = `Скачано: ${downloadedMB} MB из ${totalMB} MB (${progressPercent.toFixed(1)}%)`;
                }

                // После полной загрузки создаем Blob и запускаем скачивание
                const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' });
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'standrise0.30.0.apk'; // Имя файла для сохранения
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl);

                // Скрываем прогресс-бар после завершения
                downloadProgress.style.display = 'none';
                downloadButton.disabled = false;
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                progressText.textContent = 'Ошибка загрузки файла. Проверьте ссылку.';
                setTimeout(() => {
                    downloadProgress.style.display = 'none';
                    downloadButton.disabled = false;
                }, 2000);
            }
        });
    }

    // Menu Button
    if (menuButton && devBanner) {
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            devBanner.style.display = 'flex';
            setTimeout(() => devBanner.classList.add('active'), 10);
        });

        devBanner.querySelector('.banner-ok').addEventListener('click', () => {
            devBanner.classList.remove('active');
            setTimeout(() => devBanner.style.display = 'none', 300);
        });
    }

    // Animate Icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        setTimeout(() => icon.classList.add('visible'), index * 200);
    });
});
