var Sequelize  = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const portfolioHistory = sequelize.define("portfolioHistory", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      date:  {
        type: DataTypes.DATE,
        primaryKey: true,
      },
      totalValue: {
        type: DataTypes.FLOAT,
        defaultValue:0
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
    return portfolioHistory;
  };