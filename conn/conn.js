const mongoose = require("mongoose");
const USER_NAME = "anshkg";
const PASSWORD = "kg7983";
const TODO_DB = "todo_DB";
const DB_URL = `mongodb+srv://anshkg:${PASSWORD}@cluster0.5qegh.mongodb.net/${TODO_DB}`;
mongoose.connect(DB_URL)
    .then((result) =>{
        console.log("Connected to database");
    })
    .catch(error=>{
        console.log("Failed to connect",err);
    })