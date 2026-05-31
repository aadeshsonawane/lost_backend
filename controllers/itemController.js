const Item = require("../models/itemModel");


const reportLost = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      itemType: "lost",
      reportedBy: req.user._id,
    });
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const reportFound = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      itemType: "found",
      reportedBy: req.user._id,
    });
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllItems = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = { status: "approved" };
    if (type) filter.itemType = type;
    if (category) filter.category = category;

    const items = await Item.find(filter)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const markRecovered = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { status: "recovered" },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const adminGetAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { status: "approved" },
      { new: true }
    );
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.itemId);
    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  reportLost,
  reportFound,
  getAllItems,
  markRecovered,
  adminGetAllItems,
  approveItem,
  deleteItem,
};