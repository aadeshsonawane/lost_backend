const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    itemType: { type: String, enum: ["lost", "found"], required: true },
    imageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "recovered"],
      default: "pending",
    },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);