module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
      username: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pfpname: {
        type: DataTypes.STRING(255),
      },
      pfpdata: {
        type: DataTypes.BLOB('long'),
      },
      rights: {
        type: DataTypes.ENUM('Member', 'Admin'),
        defaultValue: 'Member',
      },
      about: {
        type: DataTypes.TEXT('medium'),
      },
    });
  
    return Users;
  };
