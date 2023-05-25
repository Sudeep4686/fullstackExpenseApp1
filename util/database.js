const Sequelize = require('sequelize');

const sequelize = new Sequelize('fullstackexpensesapp','root','1234',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports = sequelize;
