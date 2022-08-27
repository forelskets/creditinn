const nodemailer = require("nodemailer");

const Emailfn = async (Message, Email) => {
  console.log(Email, Message, "email fun");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "du19sh92yant@gmail.com ",
      pass: "zmuofnqpmpydgwgh",
    },
  });
  let info = await transporter.sendMail({
    from: '"CreditsIN Message" <creditsin.com@gmail.com>',
    to: `${Email} ,  info@creditsin.com, mr.sachinpathak95@gmail.com , du19sh92yant@gmail.com`,
    subject: `Hello ${Email}✔`,
    html: `<br>${Message}</br>`,
  });
  console.log(info, "info");
};

module.exports = Emailfn;
