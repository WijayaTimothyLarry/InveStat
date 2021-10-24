var Sequelize  = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const watchlistStock = sequelize.define("watchlistStock", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
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