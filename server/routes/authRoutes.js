const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { registerController, loginController, getCurrentUser } = require("../controllers/authController");

router
    .route("/register")
    .post(registerController);

router
    .route("/login")
    .post(loginController);

router
    .route('/currentUser')
    .get(authMiddleware, getCurrentUser);

module.exports = router;