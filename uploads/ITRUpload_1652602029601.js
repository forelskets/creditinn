const Application = require("../models/application");
const EmploymentDetails = require("../models/employmentDetails");
const Profile = require("../models/profile");
const KYC = require("../models/kycDetails");

exports.getApplicationList = async (req, res, next) => {
  console.log("4");
  console.log("kycDetails req", req);
  console.log("req.files", req.files);

  const fileArray = [];
  const filesArray = [req.files.ITRUpload[0]];

  console.log("aaaaaa fileArray", filesArray);

  filesArray.forEach((element) => {
    console.log("aaaaaa element", element);
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    fileArray.push(file);
  });
  console.log("req.body", req.body);
  console.log("fileArray", fileArray);
  console.log(
    req.body.FirstName,

    req.body.FatherName,
    req.body.DOB,

    req.body.Mobile,
    req.body.CurrentAddress,

    req.body.State,
    req.body.City,
    req.body.ZIP,
    req.body.FirmName,

    req.body.TotalBusinessExperience,
    req.body.CurrentYearIncome,
    req.body.LastYearIncome,
    req.body.AdhaarNo,
    req.body.GST,
    req.body.PanNo,
    req.body.ActiveLoanAmount,
    req.body.Emi,
    req.body.loanPurpose,
    req.body.loanAmount,
    req.body.profession
  );

  if (
    !req.body.FirstName ||
    !req.body.FatherName ||
    !req.body.DOB ||
    !req.body.Mobile ||
    !req.body.CurrentAddress ||
    !req.body.State ||
    !req.body.City ||
    !req.body.ZIP ||
    !req.body.AdhaarNo ||
    !req.body.PanNo ||
    !req.body.loanPurpose ||
    !req.body.loanAmount ||
    !req.body.profession ||
    !req.body.FirmName ||
    !req.body.TotalBusinessExperience ||
    !req.body.CurrentYearIncome ||
    !req.body.LastYearIncome ||
    !req.body.GST 
 
  ) {
    res.send({
      status: 401,
      message: "server is not getting complete data please fill carefully",
    });
  } else {
    console.log(
      "else",
      req.body.loanPurpose,
      req.body.loanAmount,
      req.body.profession
    );
    // req.rootUser = {};
    // req.rootUser.UserId = '620fe9f80c762c22263a6b42';
    console.log("userId:", req.userId);
    console.log("aa:", req.rootUser);
    const profile = await Profile.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        FirstName: req.body.FirstName,
       
        FatherName: req.body.FatherName,
        DOB: req.body.DOB,
        
        Mobile: req.body.Mobile,
        
        CurrentAddress: req.body.CurrentAddress,
        
        State: req.body.State,
        City: req.body.City,
        ZIP: req.body.ZIP,
      },
      { upsert: true }
    );

    console.log("profile:", profile);
    const details = await EmploymentDetails.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        FirmName: req.body.FirmName,
        TotalBusinessExperience: req.body.TotalBusinessExperience,
        CurrentYearIncome: req.body.CurrentYearIncome,
        LastYearIncome: req.body.LastYearIncome,
        GST: req.body.GST,
        ITRUpload: req.body.ITRUpload,
        ActiveLoanAmount : req.body.ActiveLoanAmount,
        Emi: req.body.Emi
      },
      { upsert: true }
    );

    const kyc = await KYC.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        AdhaarNo: req.body.AdhaarNo,
        PanNo: req.body.PanNo,
        ActiveLoanAmount: req.body.LoanAmount,
      },
      { upsert: true }
    );
    let count = await Application.collection.count();
    const counter = `AP${count}CRED`;

    

    try {
      const kycSave =  await KYC.findOne({UserId: req.userId});
      const detailsSave =  await EmploymentDetails.findOne({UserId: req.userId});
      const profileSave =  await Profile.findOne({UserId: req.userId});
    
     
      console.log("aaa", profileSave, detailsSave, kycSave);

      const applicaiton = new Application({
        UserId: req.userId,
        ProfileId: profileSave._id,
        EploymentId: detailsSave._id,
        KycId: kycSave._id,
        Purpose: req.body.loanPurpose,
        Amount: req.body.loanAmount,
        Profession: req.body.profession,
        ApplicationNo: counter,
        status: "pending",
      });
      console.log("applicaiton", applicaiton);

      const applicationSave =  applicaiton.save();
      console.log("aa applicaiton", applicationSave);

      if (profileSave && detailsSave && kycSave && applicationSave) {
        console.log(profileSave, detailsSave, kycSave, applicationSave);
        return res.send({
          status: 1,
          message: `Your Application Submitted successfully and You application no. is ${counter}`,
        });
      } else {
        console.log(profileSave, detailsSave, kycSave, applicationSave);
        return res.send({
          status: 0,
          message: "any technical problems please try again",
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Byte";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};

exports.getApplicationLists = async (req, res, next) => {
  console.log("4");
  console.log("kycDetail req", req.body.FirstName);
 
  if (
    (!req.body.FirstName ||
      !req.body.FatherName ||
      !req.body.DOB ||
      !req.body.Mobile ||
      !req.body.CurrentAddress ||
      !req.body.State ||
      !req.body.City ||
      !req.body.ZIP ||
      !req.body.CompanyName ||
      !req.body.TotalExperience ||
      !req.body.MonthlyIncome ||
      !req.body.AdhaarNo ||
      !req.body.PanNo ||
      !req.body.loanPurpose,
    !req.body.loanAmount,
    !req.body.profession)
  ) {
    console.log(
      "status 401",
      req.body.FirstName,

      req.body.FatherName,
      req.body.DOB,

      req.body.Mobile,
      req.body.CurrentAddress,

      req.body.State,
      req.body.City,
      req.body.ZIP,
      req.body.ActiveLoanAmount,
      req.body.Emi,
      req.body.CompanyName,

      req.body.TotalExperience,
      req.body.MonthlyIncome,

      req.body.AdhaarNo,

      req.body.PanNo,

      req.body.loanPurpose,
      req.body.loanAmount,
      req.body.profession
    );
    res
      .status(401)
      .json("server is not getting complete data please fill carefully");
  } else {
    console.log(
      "else",
      req.body.loanPurpose,
      req.body.loanAmount,
      req.body.profession
    );

    console.log("userId:", req.userId);
    console.log("aa:", req.rootUser);
    const profile = await Profile.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        FirstName: req.body.FirstName,

        FatherName: req.body.FatherName,
        DOB: req.body.DOB,

        Mobile: req.body.Mobile,
        CurrentAddress: req.body.CurrentAddress,

        State: req.body.State,
        City: req.body.City,
        ZIP: req.body.ZIP,
      },
      { upsert: true }
    );

    console.log("profile:", profile);
    const details = await EmploymentDetails.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        CompanyName: req.body.CompanyName,

        TotalExperience: req.body.TotalExperience,
        MonthlyIncome: req.body.MonthlyIncome,
        ActiveLoanAmount: req.body.ActiveLoanAmount,
        Emi : req.body.Emi,
      },
      { upsert: true }
    );

    const kyc = await KYC.findOneAndUpdate(
      { UserId: req.userId },
      {
        UserId: req.userId,
        AdhaarNo: req.body.AdhaarNo,
        PanNo: req.body.PanNo,

        ActiveLoanAmount: req.body.LoanAmount,
      },
      { upsert: true }
    );
    let count = await Application.collection.count();
    const counter = `AP${count}CRED`;

   

    try {
      const profileSave = await profile.save();
      const detailsSave = await details.save();
      const kycSave = await kyc.save();
      console.log("aaa", profileSave, detailsSave, kycSave);

      const applicaiton = new Application({
        UserId: req.userId,
        ProfileId: profileSave._id,
        EploymentId: detailsSave._id,
        KycId: kycSave._id,
        Purpose: req.body.loanPurpose,
        Amount: req.body.loanAmount,
        Profession: req.body.profession,
        ApplicationNo: counter,
        status: "pending",
      });
      console.log("applicaiton", applicaiton);

      const applicationSave = await applicaiton.save();
      console.log("ss applicaiton", applicationSave);

      if (profileSave && detailsSave && kycSave && applicationSave) {
        return res.send({
          status: 1,
          message: `Your Application Submitted successfully and You application no. is ${counter}`,
        });
      } else {
        return res.send({
          status: 0,
          message: "any technical problems please try again",
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  }
};

exports.getLoanFormData = async (req, res, next) => {
  console.log("LoanFormData");
  const { id } = req.params;
  try {
    console.log(id);
    var employmentDetails = await EmploymentDetails.find({ UserId: id });

    var profile = await Profile.find({ UserId: id });
    var kyc = await KYC.find({ UserId: id });
    console.log(
      "employmentDetails",
      employmentDetails,
      "profie",
      profile,
      "kyc",
      kyc
    );

    if (
      employmentDetails &&
      employmentDetails.length > 0 &&
      profile &&
      profile.length > 0 &&
      kyc &&
      kyc.length > 0
    ) {
      return res.send({
        status: 1,
        message: "success",
        data: {
          kycData: kyc,
          empDetailsData: employmentDetails,
          profileData: profile,
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
