const User = require("../models/users");

exports.getReferralCountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.find({ RefralID: id });

    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: "success",
        data: {
          referralCount: result.length,
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

exports.updateProfileById = async (req, res, next) => {
  const id = req.params.id;
  const { Name, Mobile } = req.body;

  try {
    const result = await User.findById(id);
    console.log("result", result);
    if (result) {
      await result.update({
        Name: Name,
        Mobile: Mobile,
      });

      return res.send({
        status: 1,
        message: "Updated",
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
