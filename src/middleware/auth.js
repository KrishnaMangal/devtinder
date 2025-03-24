const adminAuth =
    (res,req,next)=>{
        const token ="xyz";
        const isauth = token==="xyz";             // suppose we want to use authication we does not need to code auth code again bellow this methods.IT CAN BE DONE BY MIDDLEWARE
        if(!isauth){
        res.setstatus(404).send("not authorizes");
        }
        else{
          next();
        }
       };
const userAuth =
    (res,req,next)=>{
        const token ="xyz";
        const isauth = token==="xyz";             // suppose we want to use authication we does not need to code auth code again bellow this methods.IT CAN BE DONE BY MIDDLEWARE
        if(!isauth){
        res.setstatus(404).send("not authorizes");
        }
        else{
          next();
        }
       };
module.exports={
    adminAuth,userAuth
};