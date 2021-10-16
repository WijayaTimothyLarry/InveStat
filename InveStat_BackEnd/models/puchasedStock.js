
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

      portfolioId:{
        type : Sequelize.UUID,
        references:{
            model:"portfolios",
            key:"id",
        },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
    });
    return purchasedStock;
  };