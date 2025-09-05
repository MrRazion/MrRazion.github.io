// API функции
async function fetchUserBalance() {
    try {
        // В реальном приложении здесь будет запрос к серверу
        // Для демо возвращаем случайное значение
        return Math.floor(Math.random() * 10000);
    } catch (error) {
        console.error('Error fetching balance:', error);
        return 0;
    }
}

async function fetchUserGifts() {
    try {
        // В реальном приложении здесь будет запрос к серверу
        // Для демо возвращаем mock данные
        return [
            {
                id: "387,520",
                name: "Lol pop",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=Lol+pop",
                base_price: 450
            },
            {
                id: "111,111",
                name: "Desk calendar",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=Desk+Calendar",
                base_price: 300
            },
            {
                id: "222,222",
                name: "NFT Art",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=NFT+Art",
                base_price: 750
            },
            {
                id: "333,333",
                name: "Model Kit",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=Model+Kit",
                base_price: 600
            },
            {
                id: "444,444",
                name: "Symbol",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=Symbol",
                base_price: 400
            },
            {
                id: "555,555",
                name: "Background",
                image_url: "https://via.placeholder.com/150/8774e1/ffffff?text=Background",
                base_price: 350
            }
        ];
    } catch (error) {
        console.error('Error fetching gifts:', error);
        return [];
    }
}