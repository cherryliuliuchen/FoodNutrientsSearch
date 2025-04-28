const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify that the password is an 8-digit combination
const isPasswordValid = (password) => {
  const regex = /^[0-9]{8}$/;
  return regex.test(password);
};

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Verify the password formate
  if (!isPasswordValid(password)) {
    return res.status(400).json({ msg: 'Password must be an 8-digit number.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create the new user and save the password
    user = new User({ name, email, password }); 
    await user.save();

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ msg: 'Your account is inactive, please contact the administrator' });
    }

    // Direct comparison of clear text passwords
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    //Data will be embedded in JWT (JSON Web Token)

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Logout user (this is mostly a frontend action, but we'll create a simple endpoint for it)
exports.logoutUser = async (req, res) => {
  try {
    // Invalidate token logic can go here if needed (e.g., for blacklist or token expiry in DB)
    // For this simple implementation, just return a success message
    res.status(200).json({ msg: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get current user's information
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Admin create new user
exports.adminCreateUser = async (req, res) => {
  const { name, email, password, isActive } = req.body;

  // Verify password format
  if (!isPasswordValid(password)) {
    return res.status(400).json({ msg: 'Password must be an 8-digit number.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Creat user and save password
    user = new User({
      name,
      email,
      password, 
      isActive: isActive !== undefined ? isActive : true, // Default is active
      isAdmin: false 
    });

    await user.save();

    res.json({ msg: 'User created successfully', user });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Admin manages users (using email instead of ObjectId)
exports.adminManageUser = async (req, res) => {
  const { email } = req.params; //get user email from url

  try {
    let updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser); //If the user is updated, give the updated data to server side.
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// Verify token validity
exports.validateToken = (req, res) => {
  const token = req.header('x-auth-token');
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  // Try to verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
    res.json({ valid: true, user: decoded.user }); // Token is valid
  } catch (error) {
    res.status(400).json({ valid: false, msg: 'Invalid token.' }); // Token is invalid
  }
};

