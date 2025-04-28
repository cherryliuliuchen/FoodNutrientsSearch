module.exports = function (req, res, next) { //if (req.user && req.user.isAdmin)
  if (req.user && req.user.isAdmin === true) {
    return next();//Verification is passed and continues to process subsequent routing logic.
  } else {
    return res.status(403).json({ msg: 'Admin resources only' });
  }
};
