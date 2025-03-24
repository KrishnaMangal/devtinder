const express =require("express");
const User =require("../model/user");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

const ConnectionRequestModel = require("../model/Connectionrequest");
requestRouter.post("/request/send/:status/:ToUserId",userAuth,async(req,res)=>{
   try {
    const FromUserId = req._id;
    const ToUserId=req.params.ToUserId;
    const status=req.params.status;

   const allowedStatus=["interested","ignore"];
   if(!allowedStatus.includes(status)){
    throw new Error(" invalid status type");
   }

   const existingConnectionRequest = await ConnectionRequestModel.findOne({
    $or: [
      {
        FromUserId:FromUserId,ToUserId:ToUserId  //fromuserid:fromuserid   
      },
      {
        FromUserId:ToUserId,  //is already exist than give then a error
        ToUserId:FromUserId,
      }
    ]
   })
   if (existingConnectionRequest){
    throw new Error(" connection request already exist ");
   }

   const toUser = await User.findById(ToUserId);
   if(!toUser){                                   //to userid not from database send error 
    return res.status(400).json({
    message:"user not found!"
    })
   }

    const ConnectionRequest = new ConnectionRequestModel ({
      FromUserId,
      ToUserId,
      status,
    });
    if (ConnectionRequest.FromUserId.equals(ConnectionRequest.ToUserId)){  // you also write in request.js just teaching purposes
      throw new Error ("you cannot send connection request to yourself")
     }
    const data = await ConnectionRequest.save(); 
    const user = await User.findById(req._id);
    const touser = await User.findById(ToUserId);
     res.json({
      message:`${user.firstName} is ${status} in ${toUser.firstName}`,
      data
     });
    
    }
       catch(err){
        res.status(400).send("error"+err.message);
       }   
     } );
requestRouter.post ("/request/review/:status/:requestId",userAuth,async(req,res)=>{
try{
  const loggedInUserId = await User.findById(req._id);
  console.log(loggedInUserId._id)//touserid//first logout then login with other id otherwise you send the connection to yourself
  //status==interested when it send request
  //status==accepted when it accept request
  const requestId = req.params.requestId;
  const status = req.params.status;
  const allowedStatus=["accepted","reject"];
  if(!allowedStatus.includes(status)){
    throw new Error(" invalid status type");
   }
   const ConnectionRequest = await ConnectionRequestModel.findOne({//checking this things are in db or not
    _id:requestId,//id should present in db
    ToUserId:loggedInUserId._id,//loogedinuser should be touserif=d
    status:"interested"//status should be interested ,if ignore than it will not be able to accept
   });
   if(!ConnectionRequest){
    throw new Error("connection request not found");
   }
  ConnectionRequest.status=status;
  const data = await ConnectionRequest.save();
  res.json({
    message:`connection request ${status}ed`,
    data
  });


}
catch(err){
    res.status(400).send("error"+err.message);
}



})
  module.exports=requestRouter;