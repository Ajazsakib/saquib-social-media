const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/registration", userController.registrationPage);

router.get("/login", userController.homePage);

module.exports = router;
