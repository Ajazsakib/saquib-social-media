const userService = require("../services/userServices");

module.exports.registrationPage = function (req, res) {
  return res.render("registration", {
    title: "Saquib Social Media",
  });
};

var login = false;

module.exports.homePage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("index", {
      title: "Saquib Social Media",
      user: req.user,
      searchValue: "",
    });
  } else {
    return res.render("login", {
      title: "Saquib Social Media",
    });
  }
};

module.exports.createUser = async function (req, res) {
  try {
    await userService.createUser(req, res);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.login = function (req, res) {
  return res.redirect("/");
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const User = require("../models/user");
const FriendRequest = require("../models/friendRequestSchema");

module.exports.showAllUsers = async function (req, res) {
  let users = await User.find({});
  console.log("testttttttttttttttttttttttt");
  return res.render("allUsers", {
    title: "Saquib Social Media",
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
      status: "pending",
    });
    await newRequest.save();

    // Update the recipient's friendRequests array
    receiverUser.friendRequests.push(newRequest._id);
    senderUser.friendRequestsSent.push(receiverUser._id);
    await receiverUser.save();
    await senderUser.save();

    res.redirect("/user/all_users");
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

module.exports.friends = async function (req, res)
{
  const friendRequests = await FriendRequest.find({ _id: { $in: req.user.friendRequests } });

  
  let allSenders = []

  for (let request of friendRequests) {
    const sender = await User.findById(request.sender) 
    allSenders.push(sender)
  }

  const user = await User.findById(req.user._id).populate("friends").exec()
  
  res.render("myFriends", {
    title: "Saquib Social Media",
    senders: allSenders,
    friends: user.friends,
  });
};

module.exports.acceptFriendRequest = async function (req, res)
{
 
  const friend = await User.findById(req.params.id)
  const user = await User.findById(req.user._id)

  user.friends.push(friend._id)

  friend.friends.push(user._id)

  await FriendRequest.updateOne({sender: friend._id, receiver: user._id},{ $set: { status: 'accepted' } },)

  console.log(user.friendRequests, "friendrequest")
  console.log(friend._id, "friend_id")
  



  await user.save()

  res.redirect("back")

  


  
}
