const Application = require('../models/application');

exports.getLoanFormData = async (req, res, next) => {
  console.log('getApplicationList');
  try {
    var result = await Application.find({})
      .populate(['UserId', 'ProfileId', 'EploymentId', 'KycId'])
      .sort({ _id: 'desc' });
    console.log('result', result);

    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: 'success',
        data: {
          applications: result,
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

// exports.updateApplicationStatus = async (req, res, next) => {
//   const id = req.params.id;
//   const { status } = req.body;
//   try {
//     const result = await Application.findById(id);
//     if (result) {
//       await result.update({
//         status: status,
//       });

//       return res.send({
//         status: 1,
//         message: 'Updated',
//       });
//     } else {
//       return res.send({
//         status: 0,
//         message: 'no_record_found',
//       });
//     }
//   } catch (error) {
//     return res.send({
//       status: 0,
//       message: 'something_went_wrong',
//     });
//   }
// };
 