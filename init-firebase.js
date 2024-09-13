// TODO: Замените конфигурацию на конфигурацию вашего проекта Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB1xIUlDnaEWzeemgECA2t7j056LOYLlB0",
    authDomain: "lvyou-f2c15.firebaseapp.com",
    databaseURL: "https://lvyou-f2c15-default-rtdb.europe-west1.firebasedatabase.app", // Обновленный URL базы данных
    projectId: "lvyou-f2c15",
    storageBucket: "lvyou-f2c15.appspot.com",
    messagingSenderId: "725995365672",
    appId: "1:725995365672:web:5443e74c8711992f8a5c1d",
    measurementId: "G-H06MK3MMFW"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Если используете Firebase Authentication, настройте локальное хранилище
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log("Firebase Auth persistence set to LOCAL storage.");
    })
    .catch((error) => {
        console.error("Ошибка установки хранения сеанса:", error);
    });