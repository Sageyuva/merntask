// models/Emodel.js
const mongoose = require("mongoose");

const ESchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  designation: String,
  gender: String,
  course: String,
  imageUrl: String,
  createdDate: {
    type: Date,
    default: Date.now,
    get: function(date) {
      return date.toISOString().split('T')[0];
    }
  }
});

const EModel = mongoose.model("Employee", ESchema);
module.exports = EModel;
