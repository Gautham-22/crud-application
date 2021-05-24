const mongoose = require("mongoose");

let databaseConnection = async() => {
    try {
        let con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`Connection established to ${con.connection.host}`);
    }catch(err){
        console.log("Failed to connect. Error : "+err);
        process.exit(1);
    }
}

module.exports = databaseConnection;