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
    console.log('error', error);
    return res.send({
      status: 0,
      message: 'something_went_wrong',
    });
  }
};

exports.createBank = async (req, res, next) => {
  const { BankName, Note } = req.body;
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
  const { BankName, Note } = req.body;
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

exports.deleteBank = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Bank.findOne({ where: { id: id } });
    if (result) {
      await result.update({ deleted: 1 });

      return res.send({
        status: 1,
        message: 'deleted',
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
