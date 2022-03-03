const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      // required: true
    },
    ServiceName: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = new mongoose.model('service', serviceSchema);

module.exports = Service;
