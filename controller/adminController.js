const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Setting = require("../models/setting");
const EmailFn = require("../routers/util/Email");

exports.getAdmins = async (req, res, next) => {
  console.log("getAdmins");
  try {
    const admins = await Admin.find();
    console.log(admins, "admins");
    if (admins.length >= 0) {
      res.send({
        status: 1,
        admins,
      });
    } else {
      res.send({
        status: 0,
        msg: "data_not_available",
      });
    }
  } catch (error) {
    console(error);
    res.send({
      status: 0,
      msg: "something_technical_issues",
    });
  }
};

exports.AddAdmin = async (req, res, next) => {
  console.log("addAdmin");
  console.log(req.body, "body");
  const { Email, Password, Name, Type, Mobile } = req.body;
  const result1 = await Admin({ Email, Password, Name, Type, Mobile });
  const result = result1.save();
  try {
    if (result) {
      return res.send({
        status: 1,
        msg: "entered",
      });
    } else {
      return res.send({
        status: 0,
        msg: "failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,
      msg: "technical issues",
    });
  }
};

const generateAuthToken = (admin) => {
  return jwt.sign({ admin }, process.env.SECRET);
};

exports.loginValidations = [
  body("Email").not().isEmpty().trim().withMessage("Email is required"),
  body("Password").not().isEmpty().withMessage("Password is required"),
];

exports.AdminLogin = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { Email, Password } = req.body;

  try {
    const admin = await Admin.findOne({ Email: Email }).select("+Password");
    console.log(admin, "admin");
    if (admin) {
      const isMatch = await bcrypt.compare(Password, admin.Password);
      console.log(isMatch, "ismatch");
      if (admin && isMatch) {
        const token = generateAuthToken(admin);
        return res
          .status(200)
          .json({ msg: "you have login successfully", token, status: 1 });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "CREDENTIALS_IS_NOT_CORRECTS" }] });
      }
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "CREDENTIALS_IS_NOT_CORRECTS" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.AdminUpdate = async (req, res, next) => {
  console.log("AdminUpdated");
  const { name, mobile, email } = req.body;

  try {
    const result = await Admin.findOneAndUpdate(
      { Email: email },
      { Name: name, Email: email, Mobile: mobile },
      { upsert: true }
    );

    if (result) {
      const result1 = await Admin.findOne({ Email: email });

      const token = generateAuthToken(result1);

      return res.send({
        status: 1,
        msg: "Profile_Updated_Successfully",
        token: token,
      });
    } else {
      return res.send({
        status: 0,
        msg: "Profile_Not_finding",
      });
    }
  } catch (error) {
    return res.send({
      status: 1,
      msg: "Profile_Not_Update_due_to_some_Technical_issues",
    });
  }
};

exports.UpdateSubAdmin = async (req, res, next) => {
  console.log("UpdateSubAdmin");
  console.log(req.body);
  const id = req.params.id;
  const { Name, Email, Password, Mobile } = req.body;
  console.log(id, Name, Email, Password, Mobile);
  try {
    const result = await Admin.findOne({ _id: id }).select("+Password");
    result.Name = Name;
    result.Mobile = Mobile;
    result.Email = Email;
    result.Password = Password;
    const resultSave = await result.save();

    console.log(resultSave, "result");

    if (resultSave) {
      return res.send({
        status: 1,
        msg: "Updated_Successfully",
      });
    } else {
      return res.send({
        status: 0,
        msg: "Not_finding",
      });
    }
  } catch (error) {
    console.log(error, "error");
    return res.send({
      status: 1,
      msg: "Profile_Not_Update_due_to_some_Technical_issues",
    });
  }
};

exports.DeleteSubAdmin = async (req, res, next) => {
  console.log("sub admin delete");
  const { id } = req.body;
  console.log(id, "id");
  try {
    const response = await Admin.findByIdAndDelete(id);
    if (response) {
      res.send({
        status: 1,
        msg: "deleted_successfully",
      });
    } else {
      res.send({
        status: 0,
        msg: "subAdmin_not_find",
      });
    }
  } catch (error) {
    res.send({
      status: 0,
      msg: "something_technically_isues",
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  console.log("admin forgotPassword");
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ Email: req.body.Email });
    if (!admin) {
      return res.send({
        status: 0,
        msg: "user not find",
      });
    }
    console.log(admin, "admin");
    const otp = admin.generatePasswordOTP();
    EmailFn(otp, req.body.Email);
    return res.send({
      status: 1,
      msg: " OTP is sent to your registered email",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,
      msg: "something_technical_wrong",
    });
  }
};

exports.OtpVerification = async (req, res, next) => {
  console.log("admin forgot Password otp verification");
  console.log(req.body.otp);
  try {
    const otpVerificaiton = await Admin.findOne({
      passwordOtp: req.body.otp,
      passwordOtpExpire: { $gt: Date.now() },
    });
    if (!otpVerificaiton) {
      return res.send({
        status: 0,
        msg: "Time out or otp are not matched",
      });
    } else if (otpVerificaiton) {
      return res.send({
        status: 1,
        msg: "You are verified Admin please set your credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,
      msg: "something_is_technical_wrong",
    });
  }
};

exports.updateCredential = async (req, res, next) => {
  console.log("admin updateCredentials");
  try {
    const admin = await Admin.findOneAndUpdate({ Email: req.body.Email });
    if (!admin) {
      return res.send({
        status: 0,
        msg: "Please check email  id! ... is wrong",
      });
    }
    admin.Password = req.body.Password;
    admin.passwordOtp = undefined;
    admin.passwordOtpExpire = undefined;
    admin.save();
    return res.send({
      status: 1,
      msg: "password is successfully updated",
    });
  } catch (error) {}
};

exports.AdminSettingList = async (req, res, next) => {
  console.log("AdminSettingList");
  try {
    result = await Setting.findById("62bbd6a18daacc4f72344179");
    if (result) {
      return res.send({
        status: 1,
        data: result,
      });
    } else {
      return res.send({
        status: 0,
        msg: "data_not_found",
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      msg: "technical_issue",
    });
  }
};

exports.AdminSettingUpdate = async (req, res, next) => {
  console.log("AdminSettingUpdate");
  const { cashbackreward, minAmount, RTEditor, TEL } = req.body;
  console.log(cashbackreward, minAmount);
  try {
    const response = await Setting.findByIdAndUpdate(
      "62bbd6a18daacc4f72344179",
      { Cashbackreward: cashbackreward, Minamount: minAmount, RTEditor, TEL }
    );
    console.log(response, "response");
    if (response) {
      return res.send({
        status: 1,
        msg: "Updated_successfully",
      });
    } else {
      return res.send({
        status: 0,
        msg: "fail_ to_Update",
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      msg: "any_technical_issue",
    });
  }
};
