const { Model, DataTypes } = require('sequelize');
const { sequelize, Anime } = require('../../db');
const AnimeEpisode = require('./AnimeEpisode'); // импорт модели серий


Anime.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Anime',
    }
);

// Определение связи
Anime.hasMany(AnimeEpisode, { foreignKey: 'animeId' });
AnimeEpisode.belongsTo(Anime, { foreignKey: 'animeId' });

module.exports = Anime;
