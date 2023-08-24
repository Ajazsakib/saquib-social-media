const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of salt rounds to use

const createUser = async (req, res) => {
  User.uploadedAvatar(req, res, async function (err) {
    if (err) {
      console.log('*******multer Error:', err);
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (req.file) {
      newUser.avatar = User.avatarPath + '/' + req.file.filename;
    }

    await newUser.save();
  });
};

module.exports = { createUser };
