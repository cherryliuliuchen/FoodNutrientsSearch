const axios = require('axios');
const config = require('../config/config');

// Helper function to normalize descriptions by removing non-alphabetical characters
function normalizeDescription(description) {
  return description.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove non-letters and convert to lowercase
}

exports.searchFood = async (req, res) => {
  try {
    const query = req.query.query || 'matcha';
    const response = await axios.get(`${config.USDA_API_BASE_URL}foods/search`, {
      params: {
        query,
        api_key: process.env.USDA_API_KEY
      }
    });

    // Normalize descriptions and filter out duplicates
    const seenDescriptions = new Set(); // Store normalized descriptions to detect duplicates
    const uniqueFoods = response.data.foods.filter(food => {
      const normalizedDescription = normalizeDescription(food.description);
      if (seenDescriptions.has(normalizedDescription)) {
        return false; // Skip this food if the normalized description was already seen
      }
      seenDescriptions.add(normalizedDescription); // Mark the normalized description as seen
      return true; // Keep this food
    }).map(food => ({
      fdcId: food.fdcId,
      description: food.description
    }));

    res.json(uniqueFoods);
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).send('Server error');
  }
};
