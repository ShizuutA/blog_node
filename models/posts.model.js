module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("posts", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      preview: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
    });
    return Posts;
};