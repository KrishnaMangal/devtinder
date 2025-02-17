const express=require('express');
const app=express();
app.use('/test/1',(res,req)=>{
    console.log(req.query);
    req.send('Hello helo helo');
})
// app.use('/test',(res,req)=>{
//     req.send('Hello World');
// })
app.get('/testing/:userid',(res,req)=>{
    console.log(req.params);
    req.send({helooo:"krishnamanagal"});
})
app.post('/test*ing',(res,req)=>{
    req.send({helooo:"krishnamanagalji"});
})
app.get(/.*ji$/,(res,req)=>{
    req.send({helooo:"krishnamanagaljiiii"});
})

// app.use((res,req)=>{
//     req.send('Hello ji');//below this are also same as this and this will override below code
// })
// app.use("/",(req,res)=>{
//     res.send('Hello Worldji');
// })
app.listen(3000,()=>{console.log('Server is running on port 3000')});