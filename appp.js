const express=require("express");
const app=express();

app.get("/",(req,res,next)=>{  
    console.log("printing  route handler");    //middleware this is same as below
    next();
});
app.get("/user",[(req,res,next)=>{  
    console.log("printing 1st route handler");   //middleware 
    next();
},
(req,res,next)=>{  
    console.log("printing 2nd route handler");    //middleware 
    next();

},
(req,res)=>{  
    console.log("printing 3rd route handler");    
     //correct method in previous class we wrote wrong by mistake
  res.status(201).send("helo heloo helloooooji");//actual route handler
}]
);
app.listen(3000,()=>{
    console.log("server started");
});
//you can handle multiple route handler function or middleware function with single route with next function 
