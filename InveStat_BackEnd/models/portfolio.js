// const uuid = require('uuid/v4'); // ES5
var Sequelize      = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    const portfolio = sequelize.define("portfolio", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
        portfolioName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalValue:  {
          type: DataTypes.FLOAT,
        },
        userEmail:{
            type : DataTypes.STRING,
            references:{
                model:"users",
                key:"email",
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        PnL :{
          type: DataTypes.FLOAT,
        },
        YTD_return:{
          type: DataTypes.FLOAT,
        }
      });
      return portfolio;
  };
