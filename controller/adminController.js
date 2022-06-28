const bcrypt = require('bcrypt');
const {body , validationResult} = require("express-validator")
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Setting = require('../models/setting');



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
          return res.status(400).json({errors:[{msg:"CREDENTIALS_IS_NOT_CORRECTS"}]})
           
        
      }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

}

exports.AdminUpdate = async(req , res , next) =>{
   console.log("AdminUpdated")
   const {name , mobile , email} = req.body;

   try {
       const result = await Admin.findOneAndUpdate({Email : email } , {Name: name , Email : email , Mobile: mobile } ,{upsert:true});
     
       if(result){
        const result1 = await Admin.findOne({Email : email });
      
        const token = generateAuthToken(result1);
        
           return res.send({
               status:1, 
               msg: "Profile_Updated_Successfully",
               token:token
           })
       }else{
        return res.send({
            status:0, 
            msg: "Profile_Not_finding"
        })
       }
   } catch (error) {
    return res.send({
        status: 1 , 
        msg: "Profile_Not_Update_due_to_some_Technical_issues"
    })
   }
}


exports.AdminSettingList = async (req , res , next) =>{
    console.log("AdminSettingList")
    try {
        result = await Setting.findById("628b6a5fe4377da6c1bb4f93")
        if(result){
            return res.send({
                status:1,
                data:result,
            })
        }else{
            return res.send({
                status:0, 
                msg:"data_not_found"
            })
        }
    } catch (error) {
        return res.send({
            status:0, 
            msg:"technical_issue"
        })
    }
}

exports.AdminSettingUpdate = async (req , res  , next) =>{
    console.log("AdminSettingUpdate")
    const {cashbackreward , minAmount , RTEditor , TEL} = req.body;
    console.log(cashbackreward , minAmount)
    try {
        const response = await Setting.findByIdAndUpdate("628b6a5fe4377da6c1bb4f93", {Cashbackreward : cashbackreward , Minamount : minAmount , RTEditor , TEL})
        console.log(response , "response") 
        if(response){
            return res.send({
                status:1,
                msg:"Updated_successfully"
            })
        }else {
            return res.send({
                status:0,
                msg:"fail_ to_Update"
            })
        }
    } catch (error) {
        return res.send({
            status:0,
            msg:"any_technical_issue"
        })
    }
}

