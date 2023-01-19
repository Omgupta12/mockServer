const mongoose = require("mongoose")

const bugSchema = new mongoose.Schema({
    content: {type: String, required: true },
    type:{type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model('bug', bugSchema);

module.exports = Bug