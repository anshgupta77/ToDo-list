const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    list:[{
        type : Schema.Types.ObjectId,
        ref: "listModel"
    }]

})
const userObj = mongoose.model("userModel",userSchema,"userCollection");
module.exports = userObj;