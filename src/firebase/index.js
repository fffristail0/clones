import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAUyd1dd5OKyfdo1L4bffiIekGqYW9Fqjc",
    authDomain: "clones-3ec8b.firebaseapp.com",
    databaseURL: "https://clones-3ec8b-default-rtdb.firebaseio.com",
    projectId: "clones-3ec8b",
    storageBucket: "clones-3ec8b.firebasestorage.app",
    messagingSenderId: "415064834438",
    appId: "1:415064834438:web:b5f94e248f976ea5ec2c07",
    measurementId: "G-ZHJWB1ZYVX"
  };

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение ссылки на базу данных
const database = getDatabase(app);

export { database };