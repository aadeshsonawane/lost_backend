const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const port = process.env.PORT || 5002;
const app = express();

connectDB();

app.use(cors({
  origin: ["https://lost-frontend-omega.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/items", require("./routes/itemRoute"));

app.get("/", (req, res) => res.send("Lost & Found API running"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});