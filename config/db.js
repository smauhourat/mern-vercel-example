const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongoURI')
const db = "mongodb+srv://admin:admin@trekkingbsas.pjsax.mongodb.net/TrekkingBsAs?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log('MongoDb Connected...')
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;