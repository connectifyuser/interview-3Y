const { User } = require('../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { name: req.query.email } 
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
