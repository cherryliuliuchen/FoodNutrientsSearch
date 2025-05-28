const MyFavorite = require('../models/MyFavorite');
const User = require('../models/User');
const Notification = require('../models/Notification');
const sendNotification = require('../utils/sendNotification');

exports.addToMyFavorites = async (req, res) => {
  const { fdcId, description } = req.body;
  try {
    // Step 1: Save MyFavorite data
    const favorite = new MyFavorite({ userId: req.user.id, fdcId, description });
    await favorite.save();

    // Step 2: Search admin
    const adminUsers = await User.find({ isAdmin: true, expoPushToken: { $exists: true } });

    for (const admin of adminUsers) {
      const message = {
        to: admin.expoPushToken,
        sound: 'default',
        title: 'New MyFavorite Added',
        body: `A new fdcId {${fdcId}} has been added to favorites`,
        data: { fdcId }
      };

      // Step 3: Create notification record
      const notification = new Notification({
        userId: admin._id,
        title: message.title,
        body: message.body,
        data: message.data,
        status: 'pending'
      });
      await notification.save();

      // Step 4: Use sendNotification
      const result = await sendNotification(message);

      notification.status = result.status;
      notification.response = result.response;
      await notification.save();

      if (result.status === 'sent') {
        console.log(` Notification in myFavorite sent to admin ${admin.email}`);
      } else {
        console.error(`Failed to send to ${admin.email}:`, result.response?.error || 'Unknown error');
      }
    }

    // Step 5: Send response
    res.json(favorite);
  } catch (err) {
    console.error('Error in addToMyFavorites:', err.message);
    res.status(500).send('Server error');
  }
};
