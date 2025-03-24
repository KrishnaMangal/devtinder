const jwt = require("jsonwebtoken");
const User =require("../model/user");  
const userAuth = async (req,res,next)=>{
   try{ 
   const cookies = req.cookies;
                   const {token} = cookies;
                   if(!token){
                   throw new Error("token not found");
                   }
                   const decodedmsg = await jwt.verify(token,"krishamagalji123");
                   const {_id} = decodedmsg;
                   console.log("user id is"+_id);
                   const user = await User.findById(_id);
                   if(!user){
                       throw new Error("user not found");
                   }
                   req._id = _id;
        next();
       
       
}
catch(err){
    res.status(404).send("there is some mistake "+ err.message)
}
};
module.exports = {userAuth};