const bodyParser = require('body-parser');
const Expense = require('./models/Expense');

async function insertData(req,res){
    console.log(req.body, "data posting");
    if (!req.body.amount || !req.body.description || !req.body.category){
        console.log("error");
        return res.status(400).send({
            message:"please fill all the details"
        })
    }
    const obj = {
        amount : req.body.amount,
        description : req.body.description,
        category : req.body.category
    }
    try{
        const data = await Expense.create(obj)
            res.redirect('/');
        }catch(error){
        res.status(500).send(error);
        console.log("could not send the data");
        };
}

module.exports={insertData};
