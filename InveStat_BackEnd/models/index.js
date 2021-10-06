'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//associations
db.user.hasMany(db.portfolio, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.portfolio.belongsTo(db.user, {onDelete:'cascade'}, {onUpdate:'cascade'})

db.portfolio.hasMany(db.purchasedStock, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.purchasedStock.belongsTo(db.portfolio, {onDelete:'cascade'}, {onUpdate:'cascade'})

db.portfolio.hasMany(db.transaction, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.transaction.belongsTo(db.portfolio, {onDelete:'cascade'}, {onUpdate:'cascade'})

db.purchasedStock.hasMany(db.transaction, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.transaction.belongsTo(db.purchasedStock, {onDelete:'cascade'}, {onUpdate:'cascade'})

db.user.hasOne(db.goalSetting, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.goalSetting.belongsTo(db.user, {onDelete:'cascade'}, {onUpdate:'cascade'})

db.user.hasMany(db.watchlistStock, {onDelete:'cascade'}, {onUpdate:'cascade'})
db.watchlistStock.belongsTo(db.user, {onDelete:'cascade'}, {onUpdate:'cascade'})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
