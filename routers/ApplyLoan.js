const express = require('express');
const EmploymentDetails = require('../models/employmentDetails');
const Profile = require('../models/profile');
const KYC = require('../models/kycDetails');
const Application = require('../models/application');
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const auth = require('../middleware/Authentication');
const loanApplyController = require('../controller/loanApplyController');

const ApplyLoanrouter = express.Router();

ApplyLoanrouter.use(
  '/uploads',
  express.static(path.join(__dirname, '/uploads'))
);

const storage = multer.diskStorage({
  destination: 'uploads/',

  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

ApplyLoanrouter.post(
  '/kycDetails',
  auth,
  upload.fields([
    { name: 'adhaar' },
    { name: 'pan' },
    { name: 'photo' },
    { name: 'bankStmt' },
  ]),
  loanApplyController.getApplicationList
);

// ApplyLoanrouter.post(
//   '/kycDetails',
//   auth,
//   upload.fields([
//     { name: 'adhaar' },
//     { name: 'pan' },
//     { name: 'photo' },
//     { name: 'bankStmt' },
//   ]),
//   async (req, res) => {
//     console.log('4');
//     console.log('kycDetails req', req);
//     console.log('req.files', req.files);

//     const fileArray = [];
//     const filesArray = [
//       req.files.adhaar[0],
//       req.files.pan[0],
//       req.files.photo[0],
//       req.files.bankStmt[0],
//     ];

//     console.log('aaaaaa fileArray', filesArray);

//     filesArray.forEach((element) => {
//       console.log('aaaaaa element', element);
//       const file = {
//         fileName: element.originalname,
//         filePath: element.path,
//         fileType: element.mimetype,
//         fileSize: fileSizeFormatter(element.size, 2),
//       };
//       fileArray.push(file);
//     });
//     console.log('req.body', req.body);
//     console.log('fileArray', fileArray);

//     if (
//       (!req.body.FirstName ||
//         !req.body.LastName ||
//         !req.body.FatherName ||
//         !req.body.DOB ||
//         !req.body.Email ||
//         !req.body.Mobile ||
//         !req.body.CurrentAddress ||
//         !req.body.CurrentAddress ||
//         !req.body.State ||
//         !req.body.City ||
//         !req.body.ZIP ||
//         !req.body.CompanyName ||
//         !req.body.Designation ||
//         !req.body.CurrentCompanyExperience ||
//         !req.body.TotalExperience ||
//         !req.body.MonthlyIncome ||
//         !req.body.AnnualIncome ||
//         !req.body.AdhaarNo ||
//         !fileArray[0] ||
//         !req.body.PanNo ||
//         !fileArray[1] ||
//         !req.body.BankName ||
//         !req.body.AccountNo ||
//         !req.body.IFSCcode ||
//         !fileArray[2] ||
//         !fileArray[3] ||
//         !req.body.LoanAmount,
//       !req.body.loanPurpose,
//       !req.body.loanAmount,
//       !req.body.profession)
//     ) {
//       res
//         .status(401)
//         .json('server is not getting complete data please fill carefully');
//     } else {
//       console.log(
//         'else',
//         req.body.loanPurpose,
//         req.body.loanAmount,
//         req.body.profession
//       );
//       // req.rootUser = {};
//       // req.rootUser.UserId = '620fe9f80c762c22263a6b42';
//       const profile = new Profile({
//         UserId: req.rootUser.UserId,
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         FatherName: req.body.FatherName,
//         DOB: req.body.DOB,
//         Email: req.body.Email,
//         Mobile: req.body.Mobile,
//         CurrentAddress: req.body.CurrentAddress,
//         CurrentAddress2: req.body.CurrentAddress,
//         State: req.body.State,
//         City: req.body.City,
//         ZIP: req.body.ZIP,
//       });
//       const details = new EmploymentDetails({
//         UserId: req.rootUser.UserId,
//         CompanyName: req.body.CompanyName,
//         Designation: req.body.Designation,
//         CurrentCompanyExperience: req.body.CurrentCompanyExperience,
//         TotalExperience: req.body.TotalExperience,
//         MonthlyIncome: req.body.MonthlyIncome,
//         AnnualIncome: req.body.AnnualIncome,
//       });

//       const kyc = new KYC({
//         UserId: req.rootUser.UserId,
//         AdhaarNo: req.body.AdhaarNo,
//         Adhaar: JSON.stringify(fileArray[0]),
//         PanNo: req.body.PanNo,
//         Pan: JSON.stringify(fileArray[1]),
//         BankName: req.body.BankName,
//         AccountNo: req.body.AccountNo,
//         IFSCcode: req.body.IFSCcode,
//         Photo: JSON.stringify(fileArray[2]),
//         BankStmt: JSON.stringify(fileArray[3]),
//         ActiveLoanAmount: req.body.LoanAmount,
//       });
//       let count = await Application.collection.count();
//       const counter = `AP${count}CRED`;

//       console.log('req', req);
//       console.log('req.body', req.body);

//       console.log('profile', profile);
//       console.log('details', details);
//       console.log('kyc', kyc);

//       try {
//         const profileSave = await profile.save();
//         const detailsSave = await details.save();
//         const kycSave = await kyc.save();
//         console.log('aaa', profileSave, detailsSave, kycSave);

//         const applicaiton = new Application({
//           UserId: req.rootUser.UserId,
//           ProfileId: profileSave.id,
//           EploymentId: detailsSave.id,
//           KycId: kycSave.id,
//           Purpose: req.body.loanPurpose,
//           Amount: req.body.loanAmount,
//           Profession: req.body.profession,
//           ApplicationNo: counter,
//         });
//         console.log('applicaiton', applicaiton);

//         const applicationSave = await applicaiton.save();
//         if (profileSave && detailsSave && kycSave && applicationSave) {
//           res.send({
//             status: 200,
//             message: `Your Application Submitted successfully and You application no. is ${counter}`,
//           });
//         } else {
//           res.send({
//             status: 401,
//             message: 'any technical problems please try again',
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// );

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Byte';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
  );
};

module.exports = ApplyLoanrouter;
