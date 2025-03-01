document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.getElementById('main-content');
    const greetingElement = document.getElementById('greeting');
    const downloadButton = document.getElementById('downloadButton');
    const menuButton = document.getElementById('menuButton');
    const devBanner = document.getElementById('devBanner');
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

    // Detect Device and Set File Info
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const fileInfo = isMobile ? 
        { url: 'files/standrise0.30.0.apk', name: 'standrise0.30.0.apk', type: 'application/vnd.android.package-archive' } :
        { url: 'files/standrise0.30.0.msi', name: 'standrise0.30.0.msi', type: 'application/x-msdownload' };

    if (fileFormatElement && fileNameElement) {
        fileFormatElement.innerHTML = `<strong>Формат файла:</strong> ${isMobile ? '.apk' : '.msi'}`;
        fileNameElement.innerHTML = `<strong>Имя файла:</strong> ${fileInfo.name}`;
    }

    // Download Button - Simple Download
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = fileInfo.url;
            link.download = fileInfo.name;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
});

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
        setTimeout(() => icon.classList.add('visible'), index * 100);
    });