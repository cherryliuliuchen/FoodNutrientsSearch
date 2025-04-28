const mongoose = require('mongoose');

// Create the MyFood model
const MyFoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fdcId: { type: String, required: true },
  description: { type: String },
  show: { type: Boolean, default: true },  // Logical delete
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MyFood', MyFoodSchema);
