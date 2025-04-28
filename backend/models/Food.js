const mongoose = require('mongoose');

// Create the food model
const FoodSchema = new mongoose.Schema({
  fdcId: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  foodNutrients: [
    {
      nutrientName: { type: String, required: true },
      value: { type: Number, default: 0 }  // Default value is 0.
    }
  ]
});

module.exports = mongoose.model('Food', FoodSchema);
