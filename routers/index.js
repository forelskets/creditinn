const express = require('express');
const User = require('../models/users');
const Otp = require('../models/otp');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Bank = require('../models/bankService');
const BankNote = require('../models/bankOffer');
const auth = require('../middleware/Authentication');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('plz filled the login details');
  }
  try {
    const userExist = await User.findOne({ Email: email });
    // console.log("userExixt", userExist);
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.Password);
      console.log('isMatch', isMatch);
      if (userExist && isMatch) {
        const token = await userExist.generateAuthToken();
        res.cookie('jwtoken', token);

        res.status(200).json(userExist);
      } else {
        res.status(400).json('Invalid credentials');
      }
    } else {
      res.status(400).json('Invalid credentials');
    }
  } catch (err) {
    console.log(err);
  }
  // console.log(req.body.email, req.body.password)
});

router.post('/serviceAdd', async (req, res) => {
  // console.log(req.body.bankId, req.body.bankName, req.body.bankShortName);
  try {
    const { note, serviceName } = req.body;
    const bank = new Bank({ ServiceName: serviceName, Note: note });
    const addBank = await bank.save();
    if (addBank) {
      res.status(200).json('user register successfully');
    } else {
      res.status(400).json('user not register successfully');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/serviceAdd', async (req, res) => {
  const data = await Bank.find({});
  res.status(200).json(data);
});

router.get('/addBankService', async (req, res) => {
  const data = await Bank.find({});
  res.status(200).json(data);
});

router.post('/userRegister', async (req, res) => {
  try {
    console.log(req.body.Refral);
    let data1 = await User.collection.count();
    const { Name, Email, Password, Mobile } = req.body;
    console.log(Name, Email, Password, Mobile);

    data1++;
    refral = 3456789 + data1;
    if (!Name || !Email || !Password || !Mobile) {
      res.status(400).send('please fill data');
    } else {
      const isMatch = await User.findOne({ Email });
      //  console.log(isMatch);
      if (isMatch) {
        res.status(400).json('user is already exist.');
      } else {
        const user = new User({
          RoleId: 2,
          UserId: data1,
          RefralNo: refral,
          Name,
          Email,
          Password,
          Mobile,

          Status: true,
        });
        const addUser = await user.save();
        // console.log(addUser);
        if (addUser) {
          const token = await addUser.generateAuthToken();
          res.cookie('jwtoken', token);
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
          // res.status(200).send({message: "otp sent"})
        };
        function otpMail(Email, otpCode, Name) {
          'use strict';
          const nodemailer = require('nodemailer');

          async function main() {
            let transporter = nodemailer.createTransport({
              host: 'mail.creditsin.com',
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: 'info@creditsin.com',
                pass: '12345678',
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
        if (addUser) {
          res.status(200).json('user register successfully1');
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/userLogin', async (req, res) => {
  console.log(req.body.email, req.body.password);
  const { email, password } = req.body;
  if (password && email) {
    const isExist = await User.findOne({ Email: email });
    console.log('a', isExist);
    if (isExist) {
      const isMatch = await bcrypt.compare(password, isExist.Password);
      console.log('b', isMatch);
      if (isMatch) {
        const token = await isExist.generateAuthToken();
        res.cookie('jwtoken', token);
        res.status(200).json(isExist);
      } else {
        res.status(400).json('login fail');
      }
    } else {
      res.status(400).json('invalid credentials');
    }
  } else {
    res.status(400).json('please fill data');
  }
});

router.post('/matchOtp', async (req, res) => {
  console.log(req.body.otp);
  const data = await Otp.find({ Code: req.body.otp });
  console.log(data);
  if (data) {
    const currentTime = new Date().getTime();
    const diff = data.expireIn - currentTime;
    if (diff < 0) {
      res.status(400).json('Token Failed');
    } else {
      res.status(200).json('Token Matched');
    }
  } else {
    res.status(400).json('Invalid otp');
  }
});

router.get('/dashboard', auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get('/profile', auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get('/userMain', auth, async (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get('/userLogout', auth, (req, res) => {
  res.clearCookie('jwtoken');
  res.status(200).send('user Logout');
});

module.exports = router;
