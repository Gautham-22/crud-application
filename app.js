const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

const databaseConnection = require("./server/database/connection");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(path.resolve(__dirname,"assets")));

app.set("view engine","ejs");

databaseConnection();

app.use("/",require("./server/routes/router"));

app.listen(PORT,() => {
    console.log(`Server started running on ${PORT}...`);
})