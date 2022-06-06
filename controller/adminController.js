const bcrypt = require('bcrypt');
const {body , validationResult} = require("express-validator")
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');



exports.AdminLoginEntry = async (req , res , next) =>{
    const {Email , Password} = req.body;
    const result1 = await Admin({Email , Password});
    const result = result1.save();
   try
   { if(result){
        return res.send({
            status : 1 ,
            msg : "entered"
        })
    }else {
        return res.send({
            status : 0 , 
            msg: "failed"
        })
    }
} catch(error){
    console.log(error);
    return res.send({
        status : 0 , 
        msg: "technical issues"
    })
}
}

const generateAuthToken = (admin) =>{
    return jwt.sign({admin} , process.env.SECRET )
}

exports.loginValidations = [
    body("Email").not().isEmpty().trim().withMessage("Email is required"),
    body("Password").not().isEmpty().withMessage("Password is required")
]

exports.AdminLogin = async (req, res , next) =>{
  console.log(req.body)
  const errors = validationResult(req);
  if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
  }
  const {Email , Password} = req.body;
  
  try {
     
      const admin = await Admin.findOne({Email : Email});
      if(admin){
         
              const isMatch = await bcrypt.compare(Password , admin.Password );
              if(admin && isMatch){
                  const token = generateAuthToken(admin);
                return res.status(200).json({msg:'you have login successfully' , token ,status: 1})
              } else {
                  return res.status(401).json({errors:[{msg:"CREDENTIALS_IS_NOT_CORRECTS"}]})
                 
              }
           
            }else{
                console.log({errors:[{msg:"CREDENTIALS_IS_NOT_CORRECTS"}]} , "error")
          return res.status(400).json({errors:[{msg:"CREDENTIALS_IS_NOT_CORRECTS"}]})
           
        
      }
  } catch (error) {
      console.log(error.array() , "array error")
    return res.status(500).json({ errors: error.array() });
  }

}