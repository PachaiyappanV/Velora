const express = require("express");
const router = express.Router();
const {
  register,
  login,
  adminLogin,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/adminLogin", adminLogin);

module.exports = router;
