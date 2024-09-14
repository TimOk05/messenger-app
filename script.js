const sendButton = document.getElementById('sendButton');
const clearButton = document.getElementById('clearButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

const database = firebase.database();

sendButton.addEventListener('click', sendMessage);
clearButton.addEventListener('click', clearMessages);

function sendMessage() {
    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        const message = {
            text: messageText,
            timestamp: Date.now()
        };

        const messagesRef = database.ref('messages');
        messagesRef.push(message);

        messageInput.value = '';
    }
}

function clearMessages() {
    const messagesRef = database.ref('messages');

    messagesRef.remove()
        .then(() => {
            messagesDiv.innerHTML = '';
            console.log('Все сообщения успешно удалены.');
        })
        .catch((error) => {
            console.error('Ошибка при удалении сообщений:', error);
        });
}

const messagesRef = database.ref('messages');
messagesRef.on('child_added', (data) => {
    const message = data.val();
    displayMessage(message);
    scrollToBottom();
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messagesDiv.appendChild(messageElement);
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}