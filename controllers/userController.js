const userService = require('../services/userServices');

module.exports.registrationPage = function (req, res) {
  return res.render('registration', {
    title: 'Saquib Social Media',
  });
};

var login = false;

module.exports.homePage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render('index', {
      title: 'Saquib Social Media',
      user: req.user,
      searchValue: '',
    });
  } else {
    return res.render('login', {
      title: 'Saquib Social Media',
    });
  }
};

module.exports.createUser = async function (req, res) {
  try {
    await userService.createUser(req, res);
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports.login = function (req, res) {
  return res.redirect('/');
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

const User = require('../models/user');
const FriendRequest = require('../models/friendRequestSchema');

module.exports.showAllUsers = async function (req, res) {
  let users = await User.find({});
  console.log('testttttttttttttttttttttttt');
  return res.render('allUsers', {
    title: 'Saquib Social Media',
    users: users,
    currentUser: req.user,
  });
};

module.exports.sendFriendRequest = async function (req, res) {
  try {
    const { senderId, receiverId } = req.body;

    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);

    const newRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });
    await newRequest.save();

    // Update the recipient's friendRequests array
    receiverUser.friendRequests.push(newRequest._id);

    await receiverUser.save();

    res.redirect('/user/all_users');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};
