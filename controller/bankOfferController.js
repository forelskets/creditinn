const BankOffer = require('../models/bankOffer');

exports.getBankOfferList = async (req, res, next) => {
  console.log('getBankOfferList');
  try {
    var result = await BankOffer.find()
      .populate(['BankName', 'BankService'])
      .sort({ _id: 'desc' });

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

exports.getBankOfferById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await BankOffer.findById(id).populate([
      'BankName',
      'BankService',
    ]);
    console.log('result', result);

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

exports.createBankOffer = async (req, res, next) => {
  const { BankName, BankService, Note } = req.body;
  try {
    // let checkExist = await BankOffer.find({
    //   where: {
    //     BankName: BankName,
    //   },
    // });

    // if (checkExist) {
    //   return res.send({
    //     status: 0,
    //     message: 'Name already exist',
    //   });
    // }

    console.log('BankName', BankName);
    console.log('Note', Note);

    const result = await BankOffer.create({
      BankName: BankName,
      BankService: BankService,
      Note: Note,
    });
    console.log('result', result);

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

exports.updateBankOffer = async (req, res, next) => {
  const id = req.params.id;
  const { BankOfferName, BankService, Note } = req.body;
  try {
    const result = await BankOffer.findById(id);
    if (result) {
      await result.update({
        BankOfferName: BankOfferName,
        BankService: BankService,
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

exports.deleteBankOffer = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await BankOffer.findOne({ where: { id: id } });
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
