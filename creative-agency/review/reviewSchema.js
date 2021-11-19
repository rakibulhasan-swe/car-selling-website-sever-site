const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reviewSchema;
