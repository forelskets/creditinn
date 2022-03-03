const jwt = require('jsonwebtoken');
const User = require('../models/users');

const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log("token",token);

    const verifyToken = jwt.verify(
      token,
      'mynameisdushyantkumarsinghiambelongstovillagelodha'
    );
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });

    if (!rootUser) {
      throw new Error('User not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    res.status(401).json('Uautherized : No token provided');
    console.log(err);
  }
};

module.exports = Authentication;
