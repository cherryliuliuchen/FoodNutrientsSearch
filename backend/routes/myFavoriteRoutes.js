// routes/myFavoriteRoutes.js
const express = require('express');
const router = express.Router();
const myFavoriteController = require('../controllers/myFavoriteController');
const auth = require('../middleware/auth');

// Add to MyFavorites
router.post('/', auth, myFavoriteController.addToMyFavorites);

module.exports = router;
