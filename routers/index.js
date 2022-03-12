const express = require("express");
const User = require("../models/users");
const Otp = require("../models/otp");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Bank = require("../models/bankService");
const BankNote = require("../models/bankOffer");
const auth = require("../middleware/Authentication");
const nodemailer = require("nodemailer");
const referralCodes = require("referral-codes");
const referralCodeGenerator = require('referral-code-generator')

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("plz filled the login details");
  }
  try {
    const userExist = await User.findOne({ Email: email });
    // console.log("userExixt", userExist);
    if (userExist) {
      if (userExist.userVerified !== 1) {
        return res.send({
          status: 0,
          message: "user is not verified",
        });
      }

      const isMatch = await bcrypt.compare(password, userExist.Password);
      console.log("isMatch", isMatch);
      if (userExist && isMatch) {
        const token = await userExist.generateAuthToken();
        res.cookie("jwtoken", token);

        res.status(200).json(userExist);
      } else {
        res.status(400).json("Invalid credentials");
      }
    } else {
      res.status(400).json("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // console.log(req.body.email, req.body.password)
});

router.post("/serviceAdd", async (req, res) => {
  // console.log(req.body.bankId, req.body.bankName, req.body.bankShortName);
  try {
    const { note, serviceName } = req.body;
    const bank = new Bank({ ServiceName: serviceName, Note: note });
    const addBank = await bank.save();
    if (addBank) {
      res.status(200).json("user register successfully");
    } else {
      res.status(400).json("user not register successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/serviceAdd", async (req, res) => {
  const data = await Bank.find({});
  res.status(200).json(data);
});

router.get("/addBankService", async (req, res) => {
  const data = await Bank.find({});
  res.status(200).json(data);
});

router.post("/userRegister", async (req, res) => {
  try {
    console.log(req.body.Refral);
    let data1 = await User.collection.count();
    const { Name, Email, Password, Mobile, RefralUserCode } = req.body;
    console.log(Name, Email, Password, Mobile);

    data1++;
    const refral = referralCodeGenerator.alphaNumeric('uppercase', 3, 1);

    const isMatch = await User.findOne({ Email });
    //  console.log(isMatch);
    if (isMatch) {
      return res.send({ status: 0, message: "user is already exist." });
    }

    let obj = {
      RoleId: 2,
      UserId: data1,
      RefralNo: refral,
      Name,
      Email,
      Password,
      Mobile,
      userVerified: 0,
      Status: true,
    };

    if (RefralUserCode) {
      const ReferedUser = await User.findOne({ RefralNo: RefralUserCode });

      if (ReferedUser) {
        obj.RefralID = ReferedUser.id;
        obj.RefralUserCode = RefralUserCode;
      }
    }

    const user = new User(obj);

    const addUser = await user.save();
    // if (addUser) {
    //   const token = await addUser.generateAuthToken();
    //   res.cookie('jwtoken', token);
    // }

    const otpFunc = async () => {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const otpData = new Otp({
        Email,
        Mobile,
        Code: otpCode,
        expireIn: new Date().getTime() + 300 * 10000,
      });
      const otpResponse = await otpData.save();
      otpMail(Email, otpCode, Name);
      // res.status(200).send({message: "otp sent"})
    };
    function otpMail(Email, otpCode, Name) {
      async function main() {
        let transporter = nodemailer.createTransport({
          host: "mail.creditsin.com",
          pool: true,
          port: 465,
          secure: true,
          auth: {
            user: "info@creditsin.com",
            pass: "12345678",
          }
        });

        let info = await transporter.sendMail({
          from: '"CreditIN OTP Verification" <info@creditsin.com>',
          to: `${Email}, info@creditsin.com, mr.sachinpathak95@gmail.com`,
          subject: `Hello ${Name}✔`,
          html: `<b>${otpCode}</b>`,
        });
      }

      main().catch(console.error);
    }

    otpFunc();
    if (addUser) {
      return res.send({
        status: 1,
        message: "user register successfully!",
        data: { user: addUser },
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: "Something Went Wrong",
    });
  }
});

router.post("/sendOtp", async (req, res) => {
  try {
    const { Email } = req.body;

    const result = await User.findOne({ Email, userVerified: 0 });
    if (!result) return res.send({ status: 0, message: "user not found" });
    const { Name, Mobile } = result;
    console.log("result", result);

    const allOtpList = await Otp.find({
      Email,
      used: 0,
    });

    console.log("allOtpList", allOtpList);

    for (const iterator of allOtpList) {
      await iterator.update({ used: 1 });
    }

    const otpFunc = async () => {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const otpData = new Otp({
        Email,
        Mobile,
        Code: otpCode,
        expireIn: new Date().getTime() + 300 * 10000,
      });

      const otpResponse = await otpData.save();
      otpMail(Email, otpCode, Name);
      console.log("otpCode", otpCode);
      // res.status(200).send({message: "otp sent"})
    };
    function otpMail(Email, otpCode, Name) {
      async function main() {
        let transporter = nodemailer.createTransport({
          host: "mail.creditsin.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "info@creditsin.com",
            pass: "12345678",
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        });

        let info = await transporter.sendMail({
          from: '"CreditIN OTP Verification" <info@creditsin.com>',
          to: `${Email}, info@creditsin.com`,
          subject: `Hello ${Name}✔`,
          html: `<b>${otpCode}</b>`,
        });
      }

      main().catch(console.error);
    }

    otpFunc();
    return res.send({
      status: 1,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: "Something Went Wrong",
    });
  }
});

router.post("/userLogin", async (req, res) => {
  console.log(req.body.email, req.body.password);
  const { email, password } = req.body;
  if (password && email) {
    const isExist = await User.findOne({ Email: email });
    console.log("a", isExist);
    if (isExist) {
      const isMatch = await bcrypt.compare(password, isExist.Password);
      console.log("b", isMatch);
      if (isMatch) {
        if (isExist.userVerified !== 1) {
          return res.send({
            status: 0,
            message: "user is not verified",
            userVerified: 1,
            data: {
              user: isExist,
            },
          });
        }
        const token = await isExist.generateAuthToken();
        res.cookie("jwtoken", token);

        return res.send({
          status: 1,
          message: "success",
          data: {
            user: isExist,
          },
        });
      } else {
        return res.send({
          status: 0,
          message: "login fail",
        });
        // res.status(400).json('login fail');
      }
    } else {
      return res.send({
        status: 0,
        message: "invalid credentials",
      });
      // res.status(400).json('invalid credentials');
    }
  } else {
    // res.status(400).json("please fill data");
    return res.send({
      status: 0,
      message: "Please Fill Data",
    });
  }
});

router.post("/matchOtp", async (req, res) => {
  const { Email, Mobile, Code } = req.body;

  const data = await Otp.findOne({ Email, Mobile, Code, used: 0 });
  console.log('aaa', data);
  if (data) {
    const currentTime = new Date().getTime();
    const diff = data.expireIn - currentTime;
    if (diff < 0) {
      return res.send({ status: 0, message: "Token Failed" });
    } else {
      await data.update({ used: 1 });
      const result = await User.findOne({ Email });
      if (result) {
        await result.update({
          userVerified: 1,
        });

        // const token = await result.generateAuthToken();
        // res.cookie('jwtoken', token);

        return res.send({
          status: 1,
          message: "User Verified",
          data: {
            user: result,
          },
        });
      } else {
        return res.send({
          status: 0,
          message: "No Record Found",
        });
      }
    }
  } else {
    return res.send({ status: 0, message: "Invalid otp" });
  }
});

router.get("/dashboard", auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get("/profile", auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get("/userMain", auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get("/userLogout", auth, (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("user Logout");
});

module.exports = router;