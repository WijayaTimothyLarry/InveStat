module.exports = (sequelize, DataTypes) => {
    const goalSetting = sequelize.define("goalSetting", {
        
        goalSettingId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull: false,
          unique:true,
        },
        // yearlyTarget: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false,
        // },
        overallTarget:  {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        duration:{
            type : DataTypes.FLOAT,
        },
        expectedReturnPerYear:{
            type : DataTypes.FLOAT,
        },
        totalValueOverYearlyTarget:{
            type : DataTypes.FLOAT,
        },
        //initial value
        initialValue:{
            type : DataTypes.FLOAT,
        },
        //invest per month value
        additionalContribution:{
            type : DataTypes.FLOAT,
        },
        totalValueOverOverallTarget:{
            type : DataTypes.FLOAT,
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
      
      return goalSetting;

  };
