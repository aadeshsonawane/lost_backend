const express = require("express");
const router = express.Router();
const {
  reportLost,
  reportFound,
  getAllItems,
  markRecovered,
  adminGetAllItems,
  approveItem,
  deleteItem,
} = require("../controllers/itemController");
const { isAuthenticated, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getAllItems);
router.post("/lost", isAuthenticated, reportLost);
router.post("/found", isAuthenticated, reportFound);
router.put("/recover/:itemId", isAuthenticated, markRecovered);

// Admin routes
router.get("/admin/items", isAuthenticated, adminOnly, adminGetAllItems);
router.put("/admin/approve/:itemId", isAuthenticated, adminOnly, approveItem);
router.delete("/admin/delete/:itemId", isAuthenticated, adminOnly, deleteItem);

module.exports = router;