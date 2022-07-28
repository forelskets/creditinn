const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    deepurl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = model("notification", notificationSchema);
module.exports = Notification;
