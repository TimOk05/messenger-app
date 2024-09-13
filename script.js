// Получение элементов из DOM
const sendButton = document.getElementById('sendButton');
const clearButton = document.getElementById('clearButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Получение ссылки на базу данных Firebase
const database = firebase.database();

// Обработчик события для кнопки отправки
sendButton.addEventListener('click', sendMessage);

// Обработчик события для кнопки очистки сообщений
clearButton.addEventListener('click', clearMessages);

// Функция для отправки сообщения
function sendMessage() {
    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        const message = {
            text: messageText,
            timestamp: Date.now()
        };

        // Ссылка на коллекцию сообщений в базе данных
        const messagesRef = database.ref('messages');
        // Отправка сообщения в базу данных
        messagesRef.push(message);

        // Очистка поля ввода
        messageInput.value = '';
    }
}

// Функция для очистки всех сообщений
function clearMessages() {
    const messagesRef = database.ref('messages');

    // Удаление всех сообщений из базы данных
    messagesRef.remove()
        .then(() => {
            // Очистка сообщений из DOM
            messagesDiv.innerHTML = '';
            console.log('Все сообщения успешно удалены.');
        })
        .catch((error) => {
            console.error('Ошибка при удалении сообщений:', error);
        });
}

// Слушатель для новых сообщений
const messagesRef = database.ref('messages');
messagesRef.on('child_added', (data) => {
    const message = data.val();
    displayMessage(message);
});

// Функция для отображения сообщения на странице
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messagesDiv.appendChild(messageElement);

    // Установка ширины сообщения
    adjustMessageWidth(messageElement);

    // Прокрутка к последнему сообщению
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Функция для динамической установки ширины сообщений
function adjustMessageWidth(messageElement) {
    const containerWidth = messagesDiv.clientWidth; // Ширина контейнера сообщений
    messageElement.style.maxWidth = `${containerWidth * 0.8}px`; // Ширина сообщения — 80% от контейнера
}