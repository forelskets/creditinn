const BankService = require('../models/bankService');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId()
exports.getServiceList = async (req, res, next) => {
  console.log('getServiceList');
  try {
    var result = await BankService.find().sort({ _id: 'desc' });
    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: 'success',
        data: {
          services: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: 'no_record_found',
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.getServiceById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await BankService.findById(id);
    if (result) {
      return res.send({
        status: 1,
        message: 'success',
        data: {
          service: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: 'no_record_found',
      });
    }
  } catch (error) {
    console.log('error', error);
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.createService = async (req, res, next) => {
  const { ServiceName, Note , CategorySelect} = req.body;
  console.log(CategorySelect , "category")
  try {
    let checkExist = await BankService.findOne({
      ServiceName: ServiceName,
    });

    console.log('checkExist', checkExist);

    if (checkExist) {
      return res.send({
        status: 0,
        message: 'Name already exist',
      });
    }

    const result = await BankService.create({
      ServiceName: ServiceName,
      Note: Note,
      Category: CategorySelect
    });

    if (result.id) {
      return res.send({
        status: 1,
        message: 'Created',
        data: {
          service: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: 'failed_to_create',
      });
    }
  } catch (error) {
    console.log('error', error);
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.updateService = async (req, res, next) => {
  const id = req.params.id;
  const { ServiceName, Note , CategorySelect } = req.body;
  try {
    let checkExist = await BankService.findById(id);
    console.log('checkExist', checkExist);
    if (checkExist && checkExist.id != id) {
      return res.send({
        status: 0,
        message: 'Name already exist',
      });
    }

    const result = await BankService.findById(id);
    console.log('result', result);
    if (result) {
      await result.update({
        ServiceName: ServiceName,
        Note: Note,
        Category: CategorySelect
      });

      return res.send({
        status: 1,
        message: 'Updated',
      });
    } else {
      return res.send({
        status: 0,
        message: 'no_record_found',
      });
    }
  } catch (error) {
    console.log('error', error);
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.ChangeServiceStatus = async (req, res, next) => {
  console.log("changeServiceStatus")
  const id = req.params.id;
  const { Status } = req.body;
  console.log(id ,Status , "data" )
  try {
    let updates = await BankService.findByIdAndUpdate(id , {Status : Status});
    console.log(updates , "update")
    if (updates) {
      return res.send({
        status: 1,
        message: 'success',
      });
    }else {
      return res.send({
        status: 0,
        message: 'not find',
      });
    }
  }catch(err){
    console.log(err);
    return res.send({
      status: 0,
      message: 'Something_technically_issue',
    });
  }
}
 exports.deleteService = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await BankService.findByIdAndDelete(id);
      if(result){
        return res.send({
          status: 1,
          message: 'deleted',
        })
      }
        else{
        return res.send({
          status: 0,
          message: 'no_record_found',
        })
      }
     
     } catch (error) {
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
 };

 exports.getMobileServiceList = async (req, res, next) => {
  console.log('getMobileServiceList');
  try {
    var result = await BankService.find({Status : true}).sort({_id :"desc"});
    console.log(result)
    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: 'success',
        data: {
          services: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: 'no_record_found',
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};


exports.getServicesForMobile = async (req , res , next) =>{
  console.log("getSeervicesForMobile")
   const {Category} = req.body
   console.log(Category , "category")
   try {
    const result = await BankService.find({Category})
    if(result){
      return res.send({
        status: 1,
        data: result
      })
    }else {
      return res.send({
        status: 0,
        msg: data_not_found
      })
    }
   } catch (error){
    console.log(error)
    return res.send({
      status: 0,
      msg: something_went_to_wrong
    })
   }
}