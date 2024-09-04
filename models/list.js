const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user:{
        type : Schema.Types.ObjectId, 
        ref: "userModel"
    }

},{timestamps: true})
const listObj = mongoose.model("listModel",listSchema,"listCollection");
module.exports = listObj;