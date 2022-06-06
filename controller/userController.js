const User = require("../models/users");
const ShareRefral = require("../models/shareRefral");
const Sentmsg = require('./utiles/mobilemsg');
const Product = require("../models/product");
const EmailSent = require('./utiles/email');
const Otp = require("../models/otp");


exports.getReferralCountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id,'kkkk')
    const result = await User.find({ RefralID: id });
    console.log(result)
    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: "success",
        data: {
          referralCount: result.length,
          referraldata: result
        },
      });
    } else {
      return res.send({
        status: 0,
        message: "no_record_found",
      });
    }
  } catch (error) {
    console.log("error", error);

    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.updateProfileById = async (req, res, next) => {
  const id = req.params.id;
  const { Name, Mobile } = req.body;

  try {
    const result = await User.findById(id);
    console.log("result", result);
    if (result) {
      await result.update({
        Name: Name,
        Mobile: Mobile,
      });

      return res.send({
        status: 1,
        message: "Updated",
      });
    } else {
      return res.send({
        status: 0,
        message: "no_record_found",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
 console.log('getallUseers')

  try {
    const result = await User.find();
    console.log("result", result);
    if (result) {
      return res.send({
        status: 1,
        message: "getted_Data",
        data: result
      });
    } else {
      return res.send({
        status: 0,
        message: "data_not_found",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.ShareRefralDataStor =  async (req , res, next)=>{
  const {name , mobile , product , refral} = req.body;
  const id = req.params.id;
  console.log(id , name , mobile , product , refral)
  try {
    const result = await ShareRefral({userId:id , Name : name , Mobile :mobile , Product : product});
    const resultSave = await result.save();
    if(resultSave){
      Sentmsg( refral , mobile)
      return res.send({
        status: 1,
        message: "Sent Successfully",
      });
    }else {
      return res.send({
        status: 0,
        message: "something_went_wrong"
      })
    }
  } catch (error){
    console.log("error" , error);
    return res.send({
      status: 0,
      message: "sonething_went_wrong"
    })
  }
}

exports.getAllRefrals =  async (req , res, next)=>{
  
  try {
    const result = await ShareRefral.find();
    if(result){
      
      return res.send({
        status: 1,
        message: "Sent Successfully",
        data: result
      });
    }else {
      return res.send({
        status: 0,
        message: "something_went_wrong"
      })
    }
  } catch (error){
    console.log("error" , error);
    return res.send({
      status: 0,
      message: "sonething_went_wrong"
    })
  }
}


exports.ProductStor =  async (req , res, next)=>{
  const {name , mobile , product , refral, email} = req.body;
  const id = req.params.id;
  console.log(id , name , mobile , product , refral , email)
  try {
    const result = await Product({userId:id , Name : name , Mobile :mobile ,Email: email , Product : product});
    const resultSave = await result.save();
    if(resultSave){
      Sentmsg( refral , mobile)
      return res.send({
        status: 1,
        message: "Submitted",
      });
    }else {
      return res.send({
        status: 0,
        message: "something_went_wrong"
      })
    }
  } catch (error){
    console.log("error" , error);
    return res.send({
      status: 0,
      message: "sonething_went_wrong"
    })
  }
}

exports.getAllProducts =  async (req , res, next)=>{
  
  try {
    const result = await Product.find();
    if(result){
      
      return res.send({
        status: 1,
        message: "Submitted",
        data: result
      });
    }else {
      return res.send({
        status: 0,
        message: "something_went_wrong"
      })
    }
  } catch (error){
    console.log("error" , error);
    return res.send({
      status: 0,
      message: "something_went_wrong"
    })
  }
}


exports.getgenerateOtp =  async (req , res, next)=>{
    const {email} = req.body;
    console.log(email)
  try {
    const result = await User.findOne({Email : email});
    if(result){
      const Email = email;
      const Mobile = result.Mobile;
      const Name = result.Name;
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const otpData = new Otp({
        Email,
        Mobile,
        Code: otpCode,
        expireIn: new Date().getTime() + 300 * 10000,
      });
      const otpResponse = await otpData.save();
      if(otpResponse){
        EmailSent(Email, Name , otpCode);
        return res.send({
          status: 1,
          message: "OTP_SENT_TO_YOUR_EMAIL_AND_MOBILE",
          data: result
        });
      }else {
        return res.send({
          status: 0,
          message: "something_wrong"
        })
      }
     
    }else {
      return res.send({
        status: 0,
        message: "USER_NOT_FOUND"
      })
    }
  } catch (error){
    console.log("error" , error);
    return res.send({
      status: 0,
      message: "sonething_went_wrong"
    })
  }
}

exports.PropfileImgUpdate = async (req, res, next)=>{
  console.log('4');
  console.log('profileImageUploads req', req);
  console.log('req.files', req.files);
  var img_path = req.files.profileImag[0].path;
  var image_path = img_path.slice(14,);
  console.log(image_path , "pathhhhhh")
  
  const file = {
    fileName: req.files.profileImag[0].originalname,
    filePath: image_path,
    fileType: req.files.profileImag[0].mimetype,
  }
  
  const update = await User.findOneAndUpdate({_id : req.userId},{PhotoURL: JSON.stringify(file)},{upsert : true}) 
  console.log("updates",update,"update")
  if(update){
    res.send({
      status: 1,
      message: "Image updated successfully"
    })
  }else{
    res.send({
      status: 0,
      message: "Image not updated "
    })
  }


}

exports.PropfileImgUpdateMobile = async (req, res, next)=>{
  const id = req.params.id
  console.log('4');
  console.log('profileImageUploads req', req);
  console.log('req.files', req.files);
  var img_path = req.files.profileImag[0].path;
  var image_path = img_path.slice(14,);
  console.log(image_path , "pathhhhhh")
  
  const file = {
    fileName: req.files.profileImag[0].originalname,
    filePath: image_path,
    fileType: req.files.profileImag[0].mimetype,
  }
  
  const update = await User.findOneAndUpdate({_id : id},{PhotoURL: JSON.stringify(file)},{upsert : true}) 
  
  if(update){
    res.send({
      status: 1,
      message: "Image updated successfully"
    })
  }else{
    res.send({
      status: 0,
      message: "Image not updated "
    })
  }
}

exports.UpdateStatus = async (req , res  , next)=>{
  console.log("updateStatus")
  const id = req.params.id;
  const status = req.body.switchStatus
  console.log(id , status , "idstatus")
  try{
  const user = await User.findOneAndUpdate({_id: id} , {Status : status});
  if(user){
    res.send({
      status : 1,
      message: "Status_changed_successfully"
    })
  }else{
    res.send({
      status: 0,
      message: "Status_not_Change"
    })
  }
}catch(err){
  console.log(err)
  res.send({
    status : 0,
    message: "something_went_wrong"
  }
  )
}
}

module.exports.retrieveUser = async (req, res, next) => {
  const { Email } = req.params;
  const { Password } = req.body;
  let updatedFields = {};

  try {
    const user = await User.findOne(
      { Email },
      'UserId Name Email Password'
    );
    updatedFields = user;
    
    if (!user) {
      return res
        .status(404)
        .send({ error: 'Could not find a user with that username.' });
    }
    if(user){
      user.Password = Password;
      const updatedUser = await user.save();
      
      return res.send({user})
    }
   
    
    return res.send({
      user
    });
  } catch (err) {
    next(err);
  }
};