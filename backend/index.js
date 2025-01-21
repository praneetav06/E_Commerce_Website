const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); // gain access to the backend directory
const cors = require("cors");
const { log } = require("console");

app.use(express.json()); // request from response will be automatically parsed to json
app.use(cors()); // React.js project will connect to express.js at 4000

// database connection with MongoDB
mongoose.connect(
  "mongodb+srv://praneetav06:qvvbSMuybRbdBsdm@e-commerce.rtb68.mongodb.net/e-commerce"
);

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploads = multer({ storage: storage });

//Creating uploads endpoint for images
app.use("/images", express.static("uploads/images"));
app.post("/upload", uploads.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//API Connection
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port", +port);
  } else {
    console.log("An error occurred : ", +error);
  }
});

app.get("/", (req, res) => {
  res.send("Express App is running");
});
