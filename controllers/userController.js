module.exports.registrationPage = function (req, res) {
  return res.render("registration", {
    title: "Saquib Social Media",
  });
};

var login = false;

module.exports.homePage = function (req, res) {
  if (login) {
    return res.render("index", {
      title: "Saquib Social Media",
    });
  } else {
    return res.render("login", {
      title: "Saquib Social Media",
    });
  }
};

const User = require("../models/user");

module.exports.createUser = async function (req, res) {
  try {
    const newUser = new User({
      name: "john_doe",
      email: "john@example.com",
      password: "password123",
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
