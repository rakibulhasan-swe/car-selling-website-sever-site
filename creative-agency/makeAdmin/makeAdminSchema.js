const mongoose = require("mongoose");

const makeAdminSchema = mongoose.Schema({
  email: {
    type: "string",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = makeAdminSchema;
