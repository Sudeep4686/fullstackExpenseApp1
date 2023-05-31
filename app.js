const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller');
const axios = require('axios');

const sequelize = require('./util/database');

const Expense = require('./models/Expense');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

sequelize.sync()
    .then(()=>{
        console.log('details synchronised with database');
    })
    .catch((error)=>{
        console.log("failed to sync the data with database");
        console.log(error.message);
    });

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','form.html'));
});

app.post('/submit-form', controller.insertData);

app.get('/expenses',async (req,res)=>{
    try{
        const expenses = await Expense.findAll();
        console.log(expenses,"data is found");
        res.status(200).send(expenses);
    }catch(err){
        console.log(err.message,"error is found here");
        res.status(500).send("Something went wrong");
    }
})

app.delete('/Expense/delete-expense/:id', async(req,res)=>{
    try{
        const expenseId = req.params.id;
        await Expense.destroy({where:{id:expenseId}});
        res.json({message:"Expense deleted successfully"});
    } catch(err){
        res.status(500).json({
            error:err,
        });
    }
})

app.put(`/expenses/editExpense/:id`, controller.editExpense);

app.listen(4010);