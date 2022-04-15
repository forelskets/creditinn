const bcrypt = require('bcryptjs/dist/bcrypt');
const Users = require('../models/users');

exports.AdminLogin = async (req, res , next) =>{
  console.log(req.body)
  const {Email , Password} = req.body;
  if(!Email || !Password){
      res.send({
          status: 0,
          message: "PLEASE FILL EMAIL AND PASSWORD CAREFULLY"
      })
  }
  try {
      
      const userExist = await Users.findOne({Email});
      if(userExist){
          if(userExist.RoleId === 1){
              const isMatch = await bcrypt.compare(Password , userExist.Password);
              if(userExist && isMatch){
                  const token = await userExist.generateAuthToken();
                  res.cookie("jwtoken" , token);
                  res.send({
                       status : 1,
                       message : "ADMIN_LOGIN_SUCCESSFULLY"
                  })
              }else{
                  res.send({
                      status :0 ,
                      message: 'CREDENTIALS_IS_NOT_CORRECTS'
                  })
              }
            }else{
                res.send({
                    status : 0,
                    message : "THIS_LOGIN_IS_ONLY_FOR_ADMIN"
                })
            }
           
      }else{
          res.send({
              status: 0,
              message : "USER_NOT EXIST"
          })
      }
  } catch (error) {
      console.log(error);
      res.send({
          status:0,
          message:"SOMETHING_IS_WRONG"
      })
  }

}