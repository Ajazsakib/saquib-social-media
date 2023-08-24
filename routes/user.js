const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

const User = require('../models/user');

router.get('/registration', userController.registrationPage);

router.get('/login', userController.homePage);

router.post('/create', userController.createUser);

router.post(
  '/createSession',
  passport.authenticate('local', { failureRedirect: '/login' }),
  userController.login
);

router.get('/logout', userController.logout);

router.get('/all_users', userController.showAllUsers);

router.get('/all_users/search', async (req, res) => {
  const searchQuery = req.query.query;

  try {
    const users = await User.find({
      name: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    });

    return res.render('allUsers', {
      title: 'Saquib Social Media',
      users: users,
      searchValue: searchQuery,
      currentUser: req.user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/send-friend-request', userController.sendFriendRequest);

module.exports = router;
