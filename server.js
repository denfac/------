// Импорты
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const cors = require('cors');




const app = express();
const PORT = 3000;

// Подключение статических файлов
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Middleware для парсинга JSON
app.use(cors());

// Настройка базы данных
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "anime.db",
});



// Синхронизация базы данных и запуск сервера
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
