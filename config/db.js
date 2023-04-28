const mongoose = require('mongoose');
//const config = require('config');
//const db = config.get('mongoURI')
//const db = "mongodb+srv://admin:admin@trekkingbsas.pjsax.mongodb.net/TrekkingBsAs?retryWrites=true&w=majority";
require("dotenv").config();

const db = process.env.MONGO_URI;
console.log(db);
const connectDB = async () => {
    try {
        console.log("MONGOOOOOOOOOOOOOOOOO: ", db)
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('MongoDb Connected...')
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;