const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Static files for frontend
app.use(express.static(path.join(__dirname, "public")));

// Middleware for parsing JSON
let data = {}; 
app.use(express.json());

// Database setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "anime.db",
});

// Models
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
    allowNull: false, // Path to image
  },
});

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
    allowNull: false, // Path to video file
  },
});

Title.hasMany(Episode, { foreignKey: "titleId" });
Episode.belongsTo(Title, { foreignKey: "titleId" });

// Routes
app.get("/titles", async (req, res) => {
  const titles = await Title.findAll();
  res.json(titles);
});

app.get("/titles/:id", async (req, res) => {
  const { id } = req.params;
  const title = await Title.findByPk(id, { include: Episode });

  if (!title) return res.status(404).json({ error: "Title not found" });

  res.json(title);
});
app.get('/anime/:id', async (req, res) => {
    const { id } = req.params;
    const title = await Title.findByPk(id, { include: Episode });
    if (!title) return res.status(404).send('Title not found');

    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>${title.name}</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <header>
                <a href="/" class="logo">Логотип</a>
            </header>
            <main class="anime-detail">
                <h1>${title.name}</h1>
                <p>${title.description}</p>
                <div class="video-player">
                    <h2>Список серий:</h2>
                    <ul>
                        ${title.Episodes.map(
                            (episode) => `
                            <li>
                                <a href="/episodes/${episode.id}">Серия ${episode.episodeNumber}</a>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
            </main>
        </body>
        </html>
    `);
});


app.get('/episodes/:id', async (req, res) => {
    const { id } = req.params;
    const episode = await Episode.findByPk(id);

    if (!episode) return res.status(404).send('Episode not found');

    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Серия ${episode.episodeNumber}</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <main class="anime-detail">
                <h1>Серия ${episode.episodeNumber}</h1>
                <video controls>
                    <source src="/uploads/${episode.videoFile}" type="video/mp4">
                    Ваш браузер не поддерживает видео.
                </video>
            </main>
        </body>
        </html>
    `);
});

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
