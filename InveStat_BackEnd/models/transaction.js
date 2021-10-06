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
        type : DataTypes.INTEGER,
        references:{
            model:"portfolio",
            key:"portfolioId",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    purchasedStockStockTickerId:{
        type : DataTypes.INTEGER,
        references:{
            model:"purchasedStock",
            key:"StockTickerId",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
    });
    return transaction;
  };