const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose
const userSchema = new Schema(
  {
    RoleId: {
      type: Number,
      required: true,
    },
    UserId: {
      type: Number,
      required: true,
    },
    RefralNo: {
      type: String,
      //    required: true
    },
    RefralID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    RefralUserCode: {
      type: String,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Mobile: {
      type: String,
      required: true,
    },
    // Refral: {
    //   type: String,
    //   // required: true,
    // },
    userVerified: {
      type: Number,
      default: 0,
    },
    Status: {
      type: Boolean,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('Password')) {
    this.Password = await bcrypt.hash(this.Password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      'mynameisdushyantkumarsinghiambelongstovillagelodha'
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const User = new mongoose.model('user', userSchema);

module.exports = User;
