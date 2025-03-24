const express=require('express');
const app=express();
const connectDB =require("./config/database");
const User =require("./model/user");
// const {Validatesinup} = require("./utils/validatesinup");
// const bycrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const {userAuth} = require("./middleware/auth");
// const { connection } = require('mongoose');
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
// app.use('/test/1',(res,req)=>{
//     console.log(req.query);
//     req.send('Hello helo helo');
// })
// // app.use('/test',(res,req)=>{
// //     req.send('Hello World');
// // })
// app.get('/testing/:userid',(res,req)=>{
//     console.log(req.params);
//     req.send({helooo:"krishnamanagal"});
// })
// app.post('/test*ing',(res,req)=>{
//     req.send({helooo:"krishnamanagalji"});
// })
// app.get(/.*ji$/,(res,req)=>{
//     req.send({helooo:"krishnamanagaljiiii"});
// })

// app.use((res,req)=>{
//     req.send('Hello ji');//below this are also same as this and this will override below code
// })
// app.use("/",(req,res)=>{
//     res.send('Hello Worldji');
// })

app.get("/users",async(req,res)=>{
    const email=req.body.emailID;
try{
    const users = await User.findOne({emailID:email});//finding in database
    if(!users){//users===0
        res.status(404).send("user not found");
    } else{
        res.send(users);
    } 
} 
catch(err){
    res.status(404).send("mistake hogyi ji "+ err.message)
}
     await console.log(email);
})
app.get("/allusers",async(req,res)=>{
try{
    const users = await User.find({ });//finding in database
    if(!users){//users===0
        res.status(404).send("user not found");
    } else{
        res.send(users);
    } 
} 
catch(err){
    res.status(404).send("mistake hogyi ji "+ err.message)
}})
app.delete("/users",async(req,res)=>{
   const userid = req.body._id;
    try{
    await User.findByIdAndDelete(userid)
    res.send("delete ho gya ji");
    }
    catch(err){
        res.status(404).send("mistake hogyi ji"+ err.message)
    }
})
app.patch("/users/:userID",async(req,res)=>{  //patch is used to update the data
    const userID = req.params?.userID;
    console.log(userID);
    const data = req.body;
    const ALLOWED_UPDATES = ['firstName',"photoUrl",'password','age',"skills","about","userID"];
    const updates = Object.keys(data);
    const isAllowed = updates.every((key)=> ALLOWED_UPDATES.includes(key));
    if(!isAllowed){
        return res.status(404).send("invalid updates"); 
    }
        if(data?.skills.length > 10){
            return res.status(404).send("skills length shoulg be greater than 10");
        }
     try{
     await User.findByIdAndUpdate({_id: userID},data,{
        runValidators:true,//checking validators condition
     })
     res.send("patch ho gya ji");
     }
     catch(err){
         res.status(404).send("mistake hogyi ji"+ err.message)
     }
 })
connectDB()
.then(()=>{
    console.log("database connnected sucessed")
    app.listen(3000,()=>{console.log('Server is running on port 3000')});
})
    .catch((err)=>{
        console.log("error hi yar");
    });