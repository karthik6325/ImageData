const mongoose = require('mongoose');

const db_url = "mongodb+srv://karthik63254:iRAVQ5RdtWm86V1O@cluster0.wjgrffp.mongodb.net/?retryWrites=true&w=majority";

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(db_url, {
        });
        console.log('Db Connected');
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = { db };
