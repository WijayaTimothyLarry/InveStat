
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define("transaction", {
      transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TransactionPrice:  {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      changeInQuantity:  {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionDate:  {
        type: DataTypes.DATE,
      },
      
      portfolioPortfolioId:{
        type : Sequelize.UUID,
        references:{
            model:"portfolios",
            key:"id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },

    purchasedStockStockTickerId:{
      type : Sequelize.UUID,
      references:{
          model:"purchasedStocks",
          key:"id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
  },

    });
    return transaction;
  };