// Получение элементов из DOM
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Получение ссылки на базу данных Firebase
const database = firebase.database();

// Обработчик события для кнопки отправки
sendButton.addEventListener('click', sendMessage);

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

    // Прокрутка к последнему сообщению
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}