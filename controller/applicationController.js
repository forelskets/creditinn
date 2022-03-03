const Application = require('../models/application');

exports.getApplicationList = async (req, res, next) => {
  console.log('getApplicationList');
  try {
    var result = await Application.find()
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

exports.updateApplicationStatus = async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const result = await Application.findById(id);
    if (result) {
      await result.update({
        status: status,
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
// exports.getApplicationById = async (req, res, next) => {
//   const id = req.params.id;
//   var options = {
//     where: {
//       id: id,
//     },
//   };

//   try {
//     const result = await Application.findById(id);
//     if (result) {
//       return res.send({
//         status: 1,
//         message: 'success',
//         data: {
//           service: result,
//         },
//       });
//     } else {
//       return res.send({
//         status: 0,
//         message: 'no_record_found',
//       });
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.send({
//       status: 0,
//       message: 'something_went_wrong',
//     });
//   }
// };

// exports.createApplication = async (req, res, next) => {
//   const { ApplicationName, Note } = req.body;
//   try {
//     console.log('ApplicationName', ApplicationName);

//     let checkExist = await Application.findOne({
//       ApplicationName: ApplicationName ? ApplicationName : null,
//     });

//     console.log('checkExist', checkExist);

//     if (checkExist) {
//       return res.send({
//         status: 0,
//         message: 'Name already exist',
//       });
//     }

//     const result = await Application.create({
//       ApplicationName: ApplicationName,
//       Note: Note,
//     });
//     console.log('result', result);

//     if (result) {
//       return res.send({
//         status: 1,
//         message: 'Created',
//         data: {
//           service: result,
//         },
//       });
//     } else {
//       return res.send({
//         status: 0,
//         message: 'failed_to_create',
//       });
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.send({
//       status: 0,
//       message: 'something_went_wrong',
//     });
//   }
// };

// exports.updateApplication = async (req, res, next) => {
//   const id = req.params.id;
//   const { ApplicationName, Note } = req.body;
//   try {
//     let checkExist = await Application.findById(id);

//     if (checkExist && checkExist.id != id) {
//       return res.send({
//         status: 0,
//         message: 'Name already exist',
//       });
//     }

//     const result = await Application.findById(id);
//     if (result) {
//       await result.update({
//         ApplicationName: ApplicationName,
//         Note: Note,
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

// exports.deleteApplication = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const result = await Application.findOne({ where: { id: id } });
//     if (result) {
//       await result.update({ deleted: 1 });

//       return res.send({
//         status: 1,
//         message: 'deleted',
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
