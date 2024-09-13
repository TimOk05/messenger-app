// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1xIUlDnaEWzeemgECA2t7j056LOYLlB0",
    authDomain: "lvyou-f2c15.firebaseapp.com",
    databaseURL: "https://lvyou-f2c15-default-rtdb.firebaseio.com",
    projectId: "lvyou-f2c15",
    storageBucket: "lvyou-f2c15.appspot.com",
    messagingSenderId: "725995365672",
    appId: "1:725995365672:web:5443e74c8711992f8a5c1d",
    measurementId: "G-H06MK3MMFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Get elements from the DOM
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        const message = {
            text: messageText,
            timestamp: Date.now()
        };

        // Reference to the messages collection in the database
        const messagesRef = ref(database, 'messages');
        // Push the message to the database
        push(messagesRef, message);

        // Clear the input field
        messageInput.value = '';
    }
}

// Listener for new messages
const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (data) => {
    const message = data.val();
    displayMessage(message);
});

// Function to display a message on the page
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messagesDiv.appendChild(messageElement);

    // Scroll to the bottom of the messages div
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}