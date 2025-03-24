const mongoose=require("mongoose");
const ConnectionrequestSchema = new mongoose.Schema({
   FromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",//reference to user collection   
    required:true,
   },
   ToUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
   },
   status:{
    type:String,
    required:true,
    enum:{//GIVEN BY MONGOOS CHECK ITS DOCUMENTATION
        values:["ignore","interested","accepted","reject"],//MEANS ONLY THESE VALUE ARE ALLOWED
        message:`{VALUE}is incorrect please try another value`

    }
   }

},{
    timestamps:true,
}
)
ConnectionrequestSchema.index({FromUserId:1,ToUserId:1}); //compound indexing
// ConnectionrequestSchema.pre("save",function(next){
//    const Connectionrequest = this;
//    if (Connectionrequest.FromUserId.equals(Connectionrequest.ToUserId)){  // you also write in request.js just teaching purposes
//     throw new Error ("you cannot send connection request to yourself")
//    }
//    next();
// })



const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",ConnectionrequestSchema);


module.exports = ConnectionRequestModel;