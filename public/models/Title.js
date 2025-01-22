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
      defaultValue: 0, // Для сортировки по популярности
    },
    isRecommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Указание рекомендуемых аниме
    },
  });
  (async () => {
    await Title.bulkCreate([
      {
        name: "Аниме 1",
        description: "Описание аниме 1",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 2",
        description: "Описание аниме 2",
        coverImage: "public/images/animeTitl2.250x350.webp",
        popularity: 200,
        isRecommended: false,
      },
      {
        name: "Аниме 3",
        description: "Описание аниме 3",
        coverImage: "public/images/animeTitl3.250x350.webp",
        popularity: 50,
        isRecommended: true,
      },
      {
        name: "Аниме 4",
        description: "Описание аниме 4",
        coverImage: "public/images/animeTitl4.250x350.webp",
        popularity: 50,
        isRecommended: true,
      },
      {
        name: "Аниме 5",
        description: "Описание аниме 5",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 6",
        description: "Описание аниме 6",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 7",
        description: "Описание аниме 7",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 8",
        description: "Описание аниме 8",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 9",
        description: "Описание аниме 9",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 10",
        description: "Описание аниме 10",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 11",
        description: "Описание аниме 11",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      {
        name: "Аниме 12",
        description: "Описание аниме 12",
        coverImage: "public/images/animeTitl1.250x350.webp",
        popularity: 100,
        isRecommended: true,
      },
      
      // Добавьте другие записи
    ]);
    console.log("Initial titles added");
  })();
  