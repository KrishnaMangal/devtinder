const express=require('express');
const app=express();
app.use('/test',(res,req)=>{
    req.send('Hello World');
})
app.use((res,req)=>{
    req.send('Hello ji');
})
app.listen(3000,()=>{console.log('Server is running on port 3000')});