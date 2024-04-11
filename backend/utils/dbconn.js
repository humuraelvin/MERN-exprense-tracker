const mongoose = require('mongoose');

const dbConn = async () => {
    try {
        await mongoose.connect("mongodb+srv://elvinhumura:ozFRLj65PJ6dmwzo@cluster0.huok3f1.mongodb.net/transaction_db?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected To MongoDb successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConn;
