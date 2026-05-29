const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db");
const port = process.env.PORT || 5002

const app = express()
connectDB();

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
});


