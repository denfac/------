const { sequelize, Anime } = require("./models/Anime");

async function initDB() {
  await sequelize.sync({ force: true }); // Пересоздаём базу данных

  await Anime.bulkCreate([
    { title: "Anime Title 1", description: "Описание аниме 1", image: "images/animeTitl1.250x350.webp" },
    { title: "Anime Title 2", description: "Описание аниме 2", image: "images/animeTitl2.250x350.webp" },
    { title: "Anime Title 3", description: "Описание аниме 3", image: "images/animeTitl3.250x350.webp" },
    { title: "Anime Title 4", description: "Описание аниме 4", image: "images/animeTitl3.250x350.webp" },
    { title: "Anime Title 5", description: "Описание аниме 5", image: "images/animeTitl3.250x350.webp" },
    { title: "Anime Title 6", description: "Описание аниме 6", image: "images/animeTitl3.250x350.webp" },
  ]);

  console.log("База данных успешно инициализирована!");
}

initDB();
