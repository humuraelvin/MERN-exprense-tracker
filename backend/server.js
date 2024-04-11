const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConn = require('./utils/dbconn');
const Transaction = require('./models/TransactionModel');


const app = express();
app.use(express.json());
app.use(cors());

//testing the app
app.get('/api/test', (req, res) => {
    res.json({ body: "test ok" })
})

dbConn();


app.post("/api/transaction", async (req, res) => {
    try {
        const { name, price, description, datetime } = req.body;
        const parsedDatetime = new Date(datetime);

        const newTransaction = new Transaction({
            name, price, description, datetime: parsedDatetime
        });

        await newTransaction.save();
        res.status(200).json({ success: true, message: "Transaction made successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


app.get('/api/getTransactions', async (req, res) => {
    try {
        const transaction = await Transaction.find()
        if (!transaction) {
            return res.status(404).json({ success: false, message: "No transaction found" })
        }
        return res.status(200).json({ success: true, transaction })
    } catch (error) {
       console.log(error);
       return res.status(500).json({success:false, message:"Internal server error"})
    }
})





const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})