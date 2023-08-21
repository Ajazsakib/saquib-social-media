const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/registration", userController.registrationPage);

router.get("/login", userController.homePage);

router.get("/create", userController.createUser);

module.exports = router;
