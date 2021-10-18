
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define("transaction", {
      transactionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      brokerageCost:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    purchasedStockId:{
      type : Sequelize.UUID,
      references:{
          model:"purchasedStocks",
          key:"id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      unique : false,
  },

    });
    return transaction;
  };


//   portfolioId:{
//     type : Sequelize.UUID,
//     references:{
//         model:"portfolios",
//         key:"id",
//     },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
// },
