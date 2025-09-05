// Проверка данных инициализации
async function validateInitData(initData) {
    try {
        // В реальном приложении здесь должна быть проверка на сервере
        // Для демонстрации всегда возвращаем true
        return true;
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
}