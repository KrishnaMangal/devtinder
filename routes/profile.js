const express = require ("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const User = require("../model/user")
const {validateEditprofileData} = require("../utils/validation")
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const _id = req._id;
        const user = await User.findById(_id);
                res.send(user);
               
            }
            catch(err){
                res.status(404).send("mistake hogyi ji "+ err.message)
            }


})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
     if(!validateEditprofileData(req)) {
        throw new Error ("INVALID FIELD OF EDIT");
        
     }
    const _id = req._id;
       const loggedinuser = await User.findById(_id);
       Object.keys(req.body).forEach((key) => ( loggedinuser[key] = req.body[key]));
       await loggedinuser.save()
       res.json({message : `${loggedinuser.firstName},your profile updated sucessfully`,data:loggedinuser,})
       console.log(loggedinuser)
    }
    
    catch(err){
        res.status(404).send("there is some mistake"+err.message);
    }
})



module.exports = profileRouter;