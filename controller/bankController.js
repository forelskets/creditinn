const Bank = require('../models/bank');

exports.getBankList = async (req, res, next) => {
  console.log('getBankList');
  try {
    var result = await Bank.find().sort({ _id: 'desc' });
    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: 'success',
        data: {
          banks: result,
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

exports.getBankById = async (req, res, next) => {
  const id = req.params.id;
  var options = {
    where: {
      id: id,
    },
  };

  try {
    const result = await Bank.findById(id);
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
    
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.createBank = async (req, res, next) => {
  const { BankName, Note , CategorySelect } = req.body;
  try {
    console.log('BankName', BankName);

    let checkExist = await Bank.findOne({
      BankName: BankName ? BankName : null,
    });

    console.log('checkExist', checkExist);

    if (checkExist) {
      return res.send({
        status: 0,
        message: 'Name already exist',
      });
    }

    const result = await Bank.create({
      BankName: BankName,
      Note: Note,
      Category: CategorySelect
    });
    console.log('result', result);

    if (result) {
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

exports.updateBank = async (req, res, next) => {
  const id = req.params.id;
  const { BankName, Note ,CategorySelect} = req.body;
  try {
    let checkExist = await Bank.findById(id);

    if (checkExist && checkExist.id != id) {
      return res.send({
        status: 0,
        message: 'Name already exist',
      });
    }

    const result = await Bank.findById(id);
    if (result) {
      await result.update({
        BankName: BankName,
        Note: Note,
        Category : CategorySelect
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
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.ChangeBankStatus = async (req, res, next) => {

  const id = req.params.id;
  const { Status } = req.body;
  console.log(id ,Status , "data" )
  try {
    let updates = await Bank.findByIdAndUpdate(id , {Status : Status});
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
  
    return res.send({
      status: 0,
      message: 'Something_technically_issue',
    });
  }
}

exports.deleteBank = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Bank.findByIdAndDelete(id);
    if (result) {
      return res.send({
        status: 1,
        message: 'deleted'
      })
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

exports.getBanksForMobile = async (req , res , next) =>{
       
       const {Category} = req.body
       try {
        const result = await Bank.find({Category})
        if(result){
          return res.send({
            status: 1,
            data: result
          })
        }else {
          return res.send({
            status: 0,
            msg: "data_not_found"
          })
        }
       } catch (error) {
       
        return res.send({
          status: 0,
          msg: something_went_to_wrong
        })
       }
}
