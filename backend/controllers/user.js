const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  try {
    console.log("reqqqqqqqqqqqqq",req.query)
    const user = await User.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.RegisterUser= async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body)

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This user already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
