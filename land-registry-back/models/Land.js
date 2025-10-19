const mongoose = require('mongoose');

const LandSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  documents: [{ type: String }], // store file paths
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Land', LandSchema);

