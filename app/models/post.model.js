const { locale } = require("moment");
const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    images: {
      type: Sequelize.STRING,
      defaultValue: "https://i.imgur.com/pHuuGxu.png",
    },
    category: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.STRING,
      defaultValue: moment().locale("id").format("LL"),
    },
  });

  return Post;
};
