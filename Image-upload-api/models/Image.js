const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  size: { type: Number, required: true },
  uploadTimestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);
