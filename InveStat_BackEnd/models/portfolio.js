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
        costPrice:  {
          type: DataTypes.FLOAT,
          defaultValue:0
        },
        totalValue: {
          type: DataTypes.FLOAT,
          defaultValue:0
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
          defaultValue:0
        },
        YTD_return:{
          type: DataTypes.FLOAT,
          defaultValue:0
        }
      });
      return portfolio;
  };
