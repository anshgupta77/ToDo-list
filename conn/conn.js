const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const TODO_DB = process.env.TODO_DB;
const DB_URL = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.5qegh.mongodb.net/${TODO_DB}`;
console.log(USER_NAME, PASSWORD, TODO_DB);
mongoose.connect(DB_URL)
    .then((result) =>{
        console.log("Connected to database");
    })
    .catch(error=>{
        console.log("Failed to connect",error);
    })