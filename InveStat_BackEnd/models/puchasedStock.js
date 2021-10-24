var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const purchasedStock = sequelize.define("purchasedStock", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    stockTickerId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    totalQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    avgPurchasePriceUsd: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    costPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    totalValue: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    userEmail: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "email",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    portfolioId: {
      type: Sequelize.UUID,
      references: {
        model: "portfolios",
        key: "id",
      },
      primaryKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  });
  return purchasedStock;
};


// stockName: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// exchangeRate:  {
//   type: DataTypes.FLOAT,
// },