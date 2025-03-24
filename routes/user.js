const express=require("express");
const userRouter=express.Router();
const User=require("../model/user");
const {userAuth}=require("../middleware/auth");
const ConnectionRequestModel=require("../model/Connectionrequest");
const user_data="firstName lastName photoUrl about";
//get all pending connection requests
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
          const loggedinuser = await User.findById(req._id);
          const connectionRequests = await ConnectionRequestModel.find({
          ToUserId:loggedinuser._id,
            status:"interested",
          }).populate("FromUserId","firstName lastName photoUrl about");//or you can do ALSO =>  .populate("FromUserId","firstName lastName"); 
          //or you can do ALSO =>  .populate("FromUserId","firstName lastName");
          res.json({message:"All connection requests",
            data:connectionRequests});


    }
    catch(err){
        res.status(404).send("there is some mistake "+err.message);
    }
})
   
userRouter.get("/user/connections",userAuth,async(req,res)=>{
try{
 const loggedinuser = await User.findById(req._id);
    const connectionRequests = await ConnectionRequestModel.find({
    $or:[
        {
        ToUserId:loggedinuser._id,
        status:"accepted",
        },
        {
        FromUserId:loggedinuser._id,
        status:"accepted",
        }
    ]
    }).populate("FromUserId",user_data).populate("ToUserId",user_data);
    
    const data = connectionRequests.map((row)=>{
        if(row.FromUserId._id.toString()===loggedinuser._id.toString()){//WE CANNNOT COMPARE OBJECTID WITH STRING SO WE CONVERT IT TO STRING
          return row.ToUserId
    }
    else{
        return row.FromUserId
    }
    })
    res.json({message:"All connection requests",
    data});
}
catch(err){
    res.status(404).send("there is some mistake "+err.message);
}

})
userRouter.get("/feed",userAuth,async(req,res)=>{

const page = parseInt(req.query.page)||1;
let limit = parseInt(req.query.limit)||10;
if(limit>50){//it is not good to send more than 50 records
    limit=50;
}
const skip = (page-1)*limit;//logic for pagination


    
// USER DID NOT SEE HIS OWN CARD
//USER DID NOT SEE HI CONNECTION HIS FEED FEED
//USER DID NOT SEE IGNORED AND ALREADY SEND CONNECTION REQUEST TO USER IN HIS FEED
//USER CAN SEE ALL PROFILE ECXEPT ABOVE 3
try{
const loggedinuser = await User.findById(req._id);
const connectionRequests = await ConnectionRequestModel.find({
$or:[
    {
    ToUserId:loggedinuser._id,//dusre isko request bheji or ye accept kari ho
    },
    {
    FromUserId:loggedinuser._id,//isne dusre ko request bheji or usne accept kari ho
    }
]
}).select("ToUserId FromUserId status").populate("FromUserId","firstName lastName photoUrl about").populate("ToUserId","firstName lastName photoUrl about");//we block or segrete the this user from feed

const hideUserFromFeed = new Set();
connectionRequests.forEach((row)=>{
    // if(row.FromUserId._id.toString()===loggedinuser._id.toString()){
        hideUserFromFeed.add(row.ToUserId._id.toString());
    // }
    // else{
        hideUserFromFeed.add(row.FromUserId._id.toString());
    // }
})
// console.log(hideUserFromFeed);
const users= await User.find({
    $and:[//and operator for both condition
        {
            _id:{$ne:loggedinuser._id}//not equal to loggedin user
        },
        {
            _id:{$nin: [...hideUserFromFeed]}//not in hideUserFromFeed
        }
    ]
    
}).select(user_data).skip(skip).limit(limit);

res.send(users);
 }
    catch(err){
        res.status(404).send("there is some mistake "+err.message);
    }})

   module.exports = userRouter;