const BankService = require('../models/bankService');

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
  const { ServiceName, Note } = req.body;
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
  const { ServiceName, Note } = req.body;
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

exports.deleteService = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Service.BankService({ where: { id: id } });
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
