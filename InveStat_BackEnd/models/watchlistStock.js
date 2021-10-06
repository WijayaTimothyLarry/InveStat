module.exports = (sequelize, DataTypes) => {
    const watchlistStock = sequelize.define("watchlistStock", {
      wStockTickerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },userEmail:{
        type : DataTypes.STRING,
        references:{
            model:"users",
            key:"email",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
    });
    return watchlistStock;
  };