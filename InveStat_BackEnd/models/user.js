module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    });
    return user
  };
