// Получаем элементы страницы
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

// Обработчик нажатия на кнопку "Отправить"
sendButton.addEventListener('click', sendMessage);

// Функция для отправки сообщения
function sendMessage() {
    const messageText = messageInput.value;

    // Проверяем, что сообщение не пустое
    if (messageText.trim() !== '') {
        // Создаем новый элемент для сообщения
        const messageElement = document.createElement('div');
        messageElement.textContent = messageText;
        messages.appendChild(messageElement);

        // Очищаем поле ввода
        messageInput.value = '';

        // Прокручиваем область сообщений вниз
        messages.scrollTop = messages.scrollHeight;
    }
}