const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);

module.exports = PurchaseModel;
