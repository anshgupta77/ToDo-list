const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//sign in
function hashedPassword(passwordForDB){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwordForDB,salt);
}

function comparePassword(loginPassword,passwordinDB){
    const isMatch = bcrypt.compareSync(loginPassword,passwordinDB);
    return isMatch;
}
router.post("/register", (req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    password = hashedPassword(password);
    let email = req.body.email;
    let obj = {email,username,password};
    console.log(obj);
    User.create(obj)
    .then(user =>{
        console.log("User is created succesfully");
        res.status(200).json({message:"Created succesfully"});
    }).catch(error =>{
        console.log(error);
        console.log("User is already existed");
        res.json({message: "User is already existed"});
    })
})

//login
router.post("/login", (req,res)=>{
    let {email,password} = req.body;
    console.log(email,password);
    User.findOne({email})
    .then(user =>{
        if(!user){
            res.json({message: "user is not found"});
        } else {
            let isMatch = comparePassword(password, user.password);
            if(!isMatch){
                res.json({message: "password is not correct"});
            }
            else{
                const {password,...others} = user._doc;// without the password show all rest details.
                // res.status(200).json("user logged in");
                res.status(200).json({others}); //
            }
        }
    })
})
module.exports = router;