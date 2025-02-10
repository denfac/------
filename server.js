const express = require("express");
const path = require("path");
const { Anime } = require("./models/Anime");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Главная страница со списком аниме
app.get("/", async (req, res) => {
  const animes = await Anime.findAll();
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Список Аниме</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <h1>Список Аниме</h1>
        <div class="anime-list">
          ${animes
            .map(
              (anime) => `
            <div class="anime-card">
              <img src="/${anime.image}" alt="${anime.title}">
              <h3><a href="/anime/${anime.id}">${anime.title}</a></h3>
              <p>${anime.description}</p>
            </div>
          `
            )
            .join("")}
        </div>
    </body>
    </html>
  `);
});

// Страница аниме с выбором серий
app.get("/anime/:id", async (req, res) => {
  const anime = await Anime.findByPk(req.params.id);
  if (!anime) {
    return res.status(404).send("Аниме не найдено");
  }

  // Папка с сериями аниме
  const animeDir = path.join(__dirname, "public/videos", String(anime.id));
  let episodes = [];

  if (fs.existsSync(animeDir)) {
    episodes = fs
      .readdirSync(animeDir)
      .filter((file) => file.endsWith(".mp4"))
      .map((file) => file.replace(".mp4", "")) // Убираем .mp4 из названия
      .sort((a, b) => a - b); // Сортируем по порядку
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${anime.title}</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <h1>${anime.title}</h1>
        <img src="/${anime.image}" alt="${anime.title}">
        <p>${anime.description}</p>

        <h2>Выберите серию</h2>
        <select id="episodeSelect">
            ${episodes
              .map(
                (ep) => `<option value="${ep}">Серия ${ep}</option>`
              )
              .join("")}
        </select>

        <h2>Смотреть</h2>
        <video id="videoPlayer" width="640" height="360" controls>
            ${episodes.length > 0 ? `<source src="/videos/${anime.id}/${episodes[0]}.mp4" type="video/mp4">` : ""}
            Ваш браузер не поддерживает видео.
        </video>

        <br><a href="/">Назад к списку</a>

        <script>
            const select = document.getElementById("episodeSelect");
            const video = document.getElementById("videoPlayer");

            select.addEventListener("change", () => {
                video.src = "/videos/${anime.id}/" + select.value + ".mp4";
                video.play();
            });
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
