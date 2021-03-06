const express = require('express');
const app = express();
const router = require('./routers/index');
const Role = require('./models/role');
const User = require('./models/users');
const cookieParser = require('cookie-parser');

const ApplyLoanRouter = require('./routers/ApplyLoan');
const serviceRouter = require('./routers/service');
const bankRouter = require('./routers/bank');
const bankOfferRouter = require('./routers/bankOffer');
const applicationRouter = require('./routers/application');
const userRouter = require('./routers/user');
const supportRouter = require('./routers/support');
const adminRouter = require('./routers/admin');
const cashAndearningRouter = require('./routers/cashAndearning');
const userBankDetailsRouter = require('./routers/userBankDetails');
const categoryRouter = require('./routers/category');
const wishlistRouter = require('./routers/wishlist');
const withdrawlsRouter = require('./routers/withdrawls');
const useremiRouter = require('./routers/useremi');
const nodemailer = require('nodemailer')

const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
require('./db/conn');




      //   const transporter = nodemailer.createTransport({
      //     service: "gmail",
      //     auth: {
      //       user: "du19sh92yant@gmail.com ",
      //       pass: "lzwildnzxkoxktrp",
      //     },
      // });
      // let info =  transporter.sendMail({
      //     from: '"CreditsIN Message" <creditsin.com@gmail.com>',
      //     to: `dushyantt9457@gmail.com ,  info@creditsin.com, mr.sachinpathak95@gmail.com , du19sh92yant@gmail.com`,
      //     subject: `Hello Dushyant✔`,
      //     html:`<br>${1919}</br>`
      // })
    

    

app.use(router);
app.use(ApplyLoanRouter);
app.use('/service', serviceRouter);
app.use('/bank', bankRouter);
app.use('/bank-offer', bankOfferRouter);
app.use('/application', applicationRouter);
app.use('/user', userRouter);
app.use('/support', supportRouter);
app.use('/admin', adminRouter);
app.use('/cashAndearning', cashAndearningRouter);
app.use('/userBankDetails' , userBankDetailsRouter)
app.use('/category' , categoryRouter)
app.use('/wishlist' , wishlistRouter)
app.use('/withdrawls' , withdrawlsRouter)
app.use('/useremi' , useremiRouter)

app.get('/', (req, res) => {
  res.send('Hello server');
});

app.listen(5000, () => {
  console.log('server is Listen at port no. 5000');
});
