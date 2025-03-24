const express=require("express");
const app=express();
const {adminAuth,userAuth} = require("./auth");
app.get("/user/ji",(req,res)=>{
    res.send("helo userji");
})
app.get("/user",userAuth,(req,res)=>{
    res.send("helo user");
})
app.use('/admin', adminAuth );
     app.get("/admin/getallData",(req,res,next)=>{  
        res.send("all data is fecthed")
    })
    app.get("/admin/DeleteallData",(req,res,next)=>{  
        res.send("all data is delete")
    })
    app.listen(3000,()=>{
        console.log("server started");
    })
