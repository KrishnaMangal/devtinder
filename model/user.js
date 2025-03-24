const mongoose=require("mongoose");
const validator=require("validator");
const bycrypt=require("bcrypt");


const jwt=require("jsonwebtoken");
 const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:30,
    },
    lastName:{
        type:String,
        maxlength:30,
    },
    emailID:{
        type: String,
        required: true,
        unique: true,//indexing automatically
        lowercase: true,
        trim: true,
        maxlength:50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email"+value);
            }
        },
    },
    about:{
        type:String,
        default:"hi i am i user",
        maxlength:30,
    },
    skills:{
        type:[String],
        maxlength:30,
       
    },
    gender:{
        type:String,
        validate(value){//you can add enum also
           if(!["male","female","others"].includes(value)){
               throw new Error("invalid gender information");
           }
    }},
    photoUrl:{
        type:String,
        default:"https://www.proteomics.uni-freiburg.de/images/team/portrait-dummy.png/image",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid URL "+value);
            }
       
    }},
    password:{
        type:String,
        required:true,
        maxlength:60,
    },
    age:{
        type:Number,
        min:18,
        maxlength:60,
    }
 },
 {timestamps:true},
 );
 userSchema.methods.getJWTtoken = async function(){
     const user=this;
     const token=jwt.sign({_id:user._id},"krishamagalji123",{expiresIn:"8d"});
return token;
 }
 userSchema.methods.validatepassword = async function(passwordinputbyuser){
     const user=this;
     const hasedpassword=user.password;
     const isMatch = await bycrypt.compare(passwordinputbyuser,hasedpassword);
     return isMatch;
 }
 const user=mongoose.model("user",userSchema);
 module.exports=user;