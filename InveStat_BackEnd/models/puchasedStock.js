
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const purchasedStock = sequelize.define("purchasedStock", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      stockTickerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stockName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalQuantity:  {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avgPurchasePriceUsd:  {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      exchangeRate:  {
        type: DataTypes.FLOAT,
      },

      portfolioPortfolioId:{
        type : Sequelize.UUID,
        references:{
            model:"portfolios",
            key:"id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
    });
    return purchasedStock;
  };