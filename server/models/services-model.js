const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  service: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  provider: {
    type: String,
    require: true,
  },
});

module.exports = new mongoose.model("Services", servicesSchema);
