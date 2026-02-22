// index.js
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const multer = require("multer");
const { uploadImage } = require('./controllers/upload/upload');

// Database connection
const connect = require('./DB/connect'); // updated connect.js
const routes = require('./routes/index');

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Multer setup
const storage = process.env.VERCEL
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: path.join(__dirname, "uploads"),
      filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
    });

const upload = multer({ storage });

if (!process.env.VERCEL) {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// Routes
app.get("/", (req, res) => res.send("Welcome to JustBuy API"));
app.use("/api/upload-image", upload.single('image'), uploadImage);
app.use("/api", routes);

// Health check
app.get('/ping', (req, res) => res.status(200).send('OK'));

// Start server only locally
const port = process.env.PORT || 6000;
const start = async () => {
  try {
    await connect(); // use cached connection
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

if (!process.env.VERCEL) start(); // serverless functions on Vercel don't start a listener

module.exports = app; // export for Vercel serverless