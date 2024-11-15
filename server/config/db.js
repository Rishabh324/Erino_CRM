const mongoose = require('mongoose');

exports.connectDB = async () => {
    const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
    await mongoose
        .connect(DB)
        .then(() => console.log("connected database"))
        .catch(err => console.log(err));
}