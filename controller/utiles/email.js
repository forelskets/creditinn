const nodemailer = require("nodemailer");

const Email = async (Email , Name , Message)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "creditsin.com@gmail.com ",
          pass: "Cghahr@1",
        },
    });
    let info = await transporter.sendMail({
        from: '"CreditsIN Message" <creditsin.com@gmail.com>',
        to: `${Email} ,  info@creditsin.com, mr.sachinpathak95@gmail.com , du19sh92yant@gmail.com`,
        subject: `Hello ${Name}✔`,
        html:`<br>${Message}</br>`
    })
    
} 

module.exports = Email;