const MyFood = require('../models/MyFood');
const Food = require('../models/Food');

// Add food to MyFoodList
exports.addToMyFood = async (req, res) => {
  const { fdcId, description } = req.body; // Get fdcId and description from client side request.
  try {
    const food = new MyFood({ userId: req.user.id, fdcId, description }); //Get userId from JWR
    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get MyFoodList
exports.getMyFoodList = async (req, res) => {
  try {
    const myFoods = await MyFood.find({ userId: req.user.id, show: true });//Search in DB

    if (!myFoods || myFoods.length === 0) {
      return res.status(404).json({ msg: 'No food items found in your list' });
    }

    const foodDetails = await Promise.all(
      myFoods.map(async (myFood) => {
        const food = await Food.findOne({ fdcId: myFood.fdcId });

        const foodDetail = {
          fdcId: myFood.fdcId,
          description: food ? food.description : 'No description available',
          energy: { nutrientName: 'Energy', value: 0, unit: 'kcal' },
          fat: { nutrientName: 'Fat', value: 0, unit: 'g' },
          carbohydrate: { nutrientName: 'Total Carbohydrate', value: 0, unit: 'g' },
          protein: { nutrientName: 'Protein', value: 0, unit: 'g' },
        };

        if (food && food.foodNutrients) {
          const energyNutrient = food.foodNutrients.find(n => n.nutrientName === 'Energy');
          const fatNutrient = food.foodNutrients.find(n => n.nutrientName === 'Fat');
          const carbNutrient = food.foodNutrients.find(n => n.nutrientName === 'Total Carbohydrate');
          const proteinNutrient = food.foodNutrients.find(n => n.nutrientName === 'Protein');

          if (energyNutrient) foodDetail.energy.value = energyNutrient.value;
          if (fatNutrient) foodDetail.fat.value = fatNutrient.value;
          if (carbNutrient) foodDetail.carbohydrate.value = carbNutrient.value;
          if (proteinNutrient) foodDetail.protein.value = proteinNutrient.value;
        }

        return foodDetail;
      })
    );

    res.json(foodDetails);//Sent foodDetails from server side to client side.
  } catch (err) {
    console.error('Error occurred while fetching MyFood list:', err.message);
    res.status(500).send('Server error');
  }
};

// Delete MyFood
exports.deleteMyFood = async (req, res) => {
  try {
    const { fdcId } = req.params;

    // Find a data set from MyFood. I give the data set name as food.
    const food = await MyFood.findOne({ fdcId, userId: req.user.id });

    if (!food) {
      return res.status(404).json({ msg: 'Food item not found' });
    }

    // Delete MyFood using the found ObjectId
    // findByIdAndUpdate is uilt-b methods provided by Mongoose.
    // Search id in the model MyFood and update.new means response the updated data.
    const deletedFood = await MyFood.findByIdAndUpdate(
      food._id, //food is the data set that we get it using findOne. ObjectId in DB
      { show: false },
      { new: true }
    );

    res.json(deletedFood);
  } catch (err) {
    console.error('Error occurred while deleting MyFood:', err.message);
    res.status(500).send('Server error');
  }
};

// Update MyFood
exports.updateMyFood = async (req, res) => {
  const { description } = req.body;
  try {
    const food = await MyFood.findOneAndUpdate(
      { fdcId: req.params.fdcId, userId: req.user.id },
      { description },
      { new: true }
    );
    res.json(food);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
