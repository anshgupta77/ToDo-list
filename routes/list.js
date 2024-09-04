const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");



//display task of loggin user
router.get("/gettask/:id", (req,res) =>{
    console.log(req.params.id);
    List.find({user: req.params.id}).sort({createdAt: -1}) // 
    .then(list =>{
        if(list.length !== 0){
            res.status(200).json(list);
        }
        else{
            res.status(200).json([]);
        }
        
    })
    .catch(err=>{
        res.json("Blog not found");
    })
})
//create task
router.post("/addtask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    console.log(title,body,id);
    const existingUser = await User.findById(id);
    if (existingUser) {
        console.log("user is present");
      const list = new List({ title, body, user: existingUser });
      await list.save().then((listDB) => {
        res.status(200).json({ listDB });
      });
      existingUser.list.push(list);
      await existingUser.save();
    } else {
      res.json({ message: "User is not found" });
    }
  } catch (err) {
    res.json({ message: "Error is saving the list" });
  }
});

//update task
router.put("/updatetask/:id", (req, res) => {
  console.log("Update the value");
  const { title, body, user} = req.body;
  console.log(title,body,user);
  User.findById(user)
    .then((found)=>{
        if(found){
            return List.findByIdAndUpdate(req.params.id, {title,body},{new:true})
        }
        else{
            res.json("User not found");
        }
    })
    .then((updatedList)=>{
        if(updatedList){
            return updatedList.save();
        }
        else{
            res.json("List not found");
        }
    })
    .then((viewList)=>{
        res.status(200).json({viewList});
    })
    .catch((err) => {
        console.log(err)
      res.json({ message: "Failed update" });
    });
});


//delete task
router.delete("/deletetask/:id", (req,res) =>{
    const {id} = req.body;
    User.findByIdAndUpdate(id, {$pull:{list: req.params.id}})
    .then((foundUser) =>{
        if(foundUser){
            console.log("User found")
            return List.findByIdAndDelete(req.params.id);
        }else{
            res.json("User not found");
        }
        
    })
    .then(deleteList =>{
        if(deleteList){
            res.status(200).json({deleteList,message:"Delete successfully"});
        }
        else{
            res.json("List not found");
        }
        
    })
    .catch(error=>{
        res.json({ message: "Failed delete" });
    })
})
module.exports = router;






// router.put("/updatetask/:id", (req, res) => {
//     console.log("Update the value");
//     const { title, body, email } = req.body;
//     User.findOne({ email })
      // .then((found)=>{
      //     if(found){
      //         List.findByIdAndUpdate(req.params.id, {title,body},{new:true})
      //         .then((List)=>{
      //         List.save().then(()=>{
      //             res.status(200).json({List});
      //         })
      //     })
      //     }
      //     else{
      //         res.status(404).json("User is not found");
      //     }
//       .then((found) => {
//         List.findByIdAndUpdate(
//           req.params.id,
//           { title, body },
//           { new: true }
//         ).then((List) => {
//           List.save().then(() => {
//             res.status(200).json({ List });
//           });
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Failed update" });
//       });
//   });