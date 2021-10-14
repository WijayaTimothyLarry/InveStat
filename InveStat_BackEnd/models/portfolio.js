module.exports = (sequelize, DataTypes) => {
  const portfolio = sequelize.define("portfolio", {
    portfolioId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    portfolioName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.FLOAT,
    },
    userEmail: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    PnL: {
      type: DataTypes.FLOAT,
    },
    YTD_return: {
      type: DataTypes.FLOAT,
    },
  });

  return portfolio;
};
