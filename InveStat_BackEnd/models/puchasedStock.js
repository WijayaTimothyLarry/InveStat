module.exports = (sequelize, DataTypes) => {
    const purchasedStock = sequelize.define("purchasedStock", {
      stockTickerId: {
        type: DataTypes.STRING,
        primaryKey: true,
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
        type : DataTypes.INTEGER,
        references:{
            model:"portfolio",
            key:"portfolioId",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
    });
    return purchasedStock;
  };