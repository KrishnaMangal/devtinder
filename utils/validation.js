const validate = require("validator");

const Validatesinup = (req) => {
    const {firstName, lastName, emailID, password} = req.body;
   
    if (!firstName || !lastName || !emailID || !password) {
        throw new Error("Please enter all fields");
    }
    else if(!validate.isEmail(emailID)){
       throw new Error ("Invalid email");
    }
    else if(!validate.isStrongPassword(password)) {
      throw new Error("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character");
    }
 
}
const validateEditprofileData = (req)=>{
  const AllowedEditFields =["firstName","lastName","emailID","about","skills","photoUrl","gender","age"]
  const isAllowed = Object.keys(req.body).every(fields=> AllowedEditFields.includes(fields));
  return isAllowed
}
module.exports = {Validatesinup,validateEditprofileData} ;