if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { cloudinary, storage } = require("../backend/cloudConfig.js");
const path = require("path"); // gain access to the backend directory
const cors = require("cors");
const upload = multer({ storage }); // Use Cloudinary storage

app.use("/images", express.static(path.join(__dirname, "/uploads/images")));
app.use(express.json()); // request from response will be automatically parsed to json
app.use(
  cors({
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
  })
); // React.js project will connect to express.js at 4000
app.use(express.urlencoded({ extended: true }));

// database connection with MongoDB
mongoose.connect(process.env.ATLAS_DB);

//Image Storage Engine
// const storage = multer.diskStorage({
//   destination: "./uploads/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

//Creating uploads endpoint for images
app.use("/images", express.static("uploads/images"));
app.post("/uploads", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: req.file.path,
    image_filename: req.file.filename,
  });
});

//Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", upload.single("product"), async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: {
      url: req.file.path, // Cloudinary URL
      filename: req.file.filename, // Cloudinary public_id
    },
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
    image_url: product.image.url,
    image_filename: product.image.filename,
  });
});

//Creating API for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//creating endpoint for newcollection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({}); //stored all the products
  let newcollection = products.slice(1).slice(-8); //added new products in newCollection
  console.log("NewCollection Fetched");
  res.send(newcollection);
});

//creating endpoint for popular in womens section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" }); //search for women category in product schema and then add all the products
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

//creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  // console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

//creating endpoint to remove product from cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("getcart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//API Connection
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port", +port);
  } else {
    console.log("An error occurred : ", +error);
  }
});

//creating Schema for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email }); //check if the user already has an account
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with the same E-mail Address",
    });
  } // send error message in case the user already exists with the same email
  let cart = {}; // if no user then create an empty cart
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  }); //create the user
  await user.save(); // save the user in the database
  const data = {
    // create a token using this object
    user: {
      // user is the key
      id: user.id, //object with the id of user.id
    },
  };
  const token = jwt.sign(data, "secret_ecom"); //created token and added salt
  res.json({ success: true, token }); //set the response
});

//Creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email }); //user related to the id will be stored in the variable
  if (user) {
    const passCompare = req.body.password === user.password; //compare the password from the API and the registered user in the database
    if (passCompare) {
      //if the pwd is true then it will create a user object
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong E-mail Address" });
  }
});

app.get("/", (req, res) => {
  res.send("Express App is running");
});
