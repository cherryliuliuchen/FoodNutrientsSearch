// models/MyFavorite.js
const mongoose = require('mongoose');

const MyFavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fdcId: { type: String, required: true },
  description: { type: String },
  show: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MyFavorite', MyFavoriteSchema);
