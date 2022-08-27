const Customer = require("../models/customerSupport");
const Corporate = require("../models/corporateSupport");
// const Email = require('../controller/utiles/email')

exports.customerSupport = async (req, res) => {
  const { customername, customeremail, customermobile, customerarea } =
    req.body;
  try {
    const customer = new Customer({
      name: customername,
      email: customeremail,
      mobile: customermobile,
      message: customerarea,
    });

    const addSupport = await customer.save();
    const email = await Email(customeremail, customername, customerarea);
    // console.log(email, 'email')
    if (addSupport) {
      return res.send({
        status: 1,
        message: "your Enquiry saved",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: "something went wrong",
    });
  }
};

exports.corporateSupport = async (req, res) => {
  const { corporatename, corporateemail, corporatemobile, corporatearea } =
    req.body;
  try {
    const corporate = new Corporate({
      name: corporatename,
      email: corporateemail,
      mobile: corporatemobile,
      message: corporatearea,
    });

    const addSupport = await corporate.save();
    const email = await Email(corporateemail, corporatename, corporatearea);
    if (addSupport) {
      return res.send({
        status: 1,
        message: "Your enquiry is saved",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: "something went wrong",
    });
  }
};
