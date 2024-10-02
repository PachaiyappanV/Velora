const express = require("express");
const router = express.Router();
const {
  register,
  login,
  adminLogin,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/adminLogin", adminLogin);
router.get("/logout", logout);

module.exports = router;
