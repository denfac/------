// server.js

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Статические файлы (CSS, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
