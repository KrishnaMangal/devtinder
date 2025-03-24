const express = require("express");

const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User =require("../model/user");
const jwt = require('jsonwebtoken');
const {Validatesinup} = require("../utils/validation");


authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, emailID, password } = req.body;
    
    try {
        // First, check if email already exists
        const existingUser = await User.findOne({ emailID: emailID });
        if (existingUser) {
            return res.status(400).send("Email ID already exists");
        }

        // If email doesn't exist, proceed with creating new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({  // Fixed 'user' to 'User' (model names should be capitalized)
            firstName,
            lastName,
            emailID,
            password: hashedPassword  // Fixed typo from 'hasedpassword'
        });

        // Validate signup (assuming this is a custom function)
        Validatesinup(req); // Make sure this function exists
        
        // Save the new user
        await user.save();
        res.send("post ho gya ji");
        
    } catch (err) {
        res.status(404).send("mistake hogyi ji: " + err.message);
    }
});


  authRouter.post("/login", async (req, res) => {
    const{firstName,lastName,emailID,password}=req.body;
    try {
     const existingUser = await User.findOne({ emailID: emailID });
     if (!existingUser) {
       return res.status(400).send("Email ID not exists");
     }
     const passwordMatch = await existingUser.validatepassword(password);
    
     if(passwordMatch){
        const token=await existingUser.getJWTtoken();
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000000),httpOnly:true});
            res.send("login sucessfully...");
     }
     else  {
        return res.status(400).send(" invalid Password ");
     } 
    } catch (err) {
      res.status(404).send("mistake hogyi ji: " + err.message);
    }
  });
  authRouter.post("/logout",async(req,res)=>{
    res
    .cookie("token",null,{
        expires: new Date(Date.now())//removing cokkie
    })
    .send("logout succesfully ...");//chaining with res
  })
module.exports=authRouter;