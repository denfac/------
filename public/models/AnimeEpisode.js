const { DataTypes } = require('sequelize');
const sequelize = require('database.sqlite');  // Импортируем sequelize из конфигурационного файла

const AnimeEpisode = sequelize.define('AnimeEpisode', {
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Дополнительные параметры для модели
  tableName: 'anime_episodes' // Указываем имя таблицы
});

module.exports = AnimeEpisode;
