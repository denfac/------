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

// Определение модели Title
const Title = sequelize.define("Title", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isRecommended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Определение модели Episode
const Episode = sequelize.define("Episode", {
  titleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Установление связей между моделями
Title.hasMany(Episode, { foreignKey: "titleId" });
Episode.belongsTo(Title, { foreignKey: "titleId" });

// Маршруты для API

// Получение всех аниме
app.get("/titles", async (req, res) => {
  const titles = await Title.findAll();
  res.json(titles);
});

// Получение популярного аниме
app.get("/popular-titles", async (req, res) => {
  const popularTitles = await Title.findAll({
    order: [["popularity", "DESC"]],
    limit: 8,
  });
  res.json(popularTitles);
});

// Получение рекомендуемого аниме
app.get("/recommended-titles", async (req, res) => {
  const recommendedTitles = await Title.findAll({
    where: { isRecommended: true },
    order: [["popularity", "DESC"]],
    limit: 8,
  });
  res.json(recommendedTitles);
});

// Получение новых поступлений
app.get("/new-titles", async (req, res) => {
  const newTitles = await Title.findAll({
    order: [["createdAt", "DESC"]],
    limit: 8,
  });
  res.json(newTitles);
});

// Добавление нового аниме
app.post("/titles", async (req, res) => {
  const { name, description, coverImage, popularity, isRecommended } = req.body;
  const newTitle = await Title.create({
    name,
    description,
    coverImage,
    popularity,
    isRecommended,
  });
  res.status(201).json(newTitle);
});

// Получение конкретного аниме с сериями
app.get("/titles/:id", async (req, res) => {
  const { id } = req.params;
  const title = await Title.findByPk(id, { include: Episode });

  if (!title) return res.status(404).json({ error: "Аниме не найдено" });

  res.json({
    id: title.id,
    name: title.name,
    description: title.description,
    coverImage: title.coverImage,
    popularity: title.popularity,
    isRecommended: title.isRecommended,
    episodes: title.Episodes.map((episode) => ({
      id: episode.id,
      episodeNumber: episode.episodeNumber,
      videoFile: episode.videoFile,
    })),
  });
});

// Получение данных о серии
app.get("/episodes/:id", async (req, res) => {
  const { id } = req.params;
  const episode = await Episode.findByPk(id);

  if (!episode) return res.status(404).json({ error: "Серия не найдена" });

  res.json({
    id: episode.id,
    titleId: episode.titleId,
    episodeNumber: episode.episodeNumber,
    videoFile: episode.videoFile,
  });
});

// Синхронизация базы данных и запуск сервера
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
