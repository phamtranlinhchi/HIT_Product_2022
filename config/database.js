const mongoose = require("mongoose");
// process.env.MONGO_URI
const connectDB = async() => {
    const conn = await mongoose.connect("mongodb+srv://Calendar:zxcvbnm1106@atlascluster.vifnygm.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        retryWrites: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;