module.exports = (sequelize, DataTypes) => {
    const PostsImage = sequelize.define('PostsImage', {
        ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        imgname: {
          type: DataTypes.STRING(255),
        },
        imgdata: {
          type: DataTypes.BLOB('long'),
          allowNull: false,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
      return PostsImage;
    }