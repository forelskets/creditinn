const User = require("../models/users");
const ShareRefral = require("../models/shareRefral");
const Sentmsg = require('./utiles/mobilemsg');
const Product = require("../models/product");

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
        message: "Store_Data",
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
        message: "Store_Data",
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
        message: "Store_Data",
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
        message: "Store_Data",
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

