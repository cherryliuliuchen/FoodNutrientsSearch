const axios = require('axios');
const logger = require('../logs/nutrientsLogger');  
const Food = require('../models/Food'); 
const config = require('../config/config');

// Get food nutrients
exports.getFoodDetail = async (req, res) => {
  const { fdcId } = req.params;
  try {
    // Search data from DB
    const food = await Food.findOne({ fdcId });

    if (food) {
      logger.info(`Get the data with  ${fdcId} from DB.`);
      return res.json(food);
    }

    // If can not find data in DB, send request to USDA.
    const response = await axios.get(`${config.USDA_API_BASE_URL}food/${fdcId}`, {
      params: {
        api_key: process.env.USDA_API_KEY
      }
    });

    // Printe the api response
    console.log(response.data);

    // Create foodDetail, it will help to save to DB
    const foodDetail = {
      fdcId: response.data.fdcId || fdcId,  // If API do not response fdcId, use the fdcId in request.
      description: response.data.description || 'No description',
      foodNutrients: response.data.foodNutrients.map(nutrient => ({
        nutrientName: nutrient.nutrient.name,  
        value: nutrient.amount || 0  // Default amout is 0.
      }))
    };

    logger.info(`Get nutrients data from API which fdcId  ${fdcId} .`);

    // Save the new data to DB
    const newFood = new Food(foodDetail);
    await newFood.save();

    res.json(foodDetail);
  } catch (err) {
    logger.error(`Error getting food data with fdcId ${fdcId}: ${err.message}`);
    res.status(500).send('Server error');
  }
};
