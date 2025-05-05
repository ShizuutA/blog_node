module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Commentaire', {
        ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT('medium'),
          allowNull: false,
        },
        upvote: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        downvote: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      });
      return Comments;
    }
