const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Expense = sequelize.define('expense',{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    },
    amount:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Expense;