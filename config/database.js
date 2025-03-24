const mongoose=require("mongoose");
const connectDB=async()=>{
await mongoose.connect("mongodb+srv://KrishnaMangal:DXDoLWJ2f9hdNJSx@namastenode.jgxfd.mongodb.net/devtinder")
}

module.exports=connectDB;
