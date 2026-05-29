const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController");
// const { isAuthenticated, authorizeRoles } = require("../middleware/authMiddleware");



router.post("/register",register);
router.post("/login", login);
// router.get("/profile", isAuthenticated, authorizeRoles("user"), getProfile);
