// Core Module
const path = require("path");

// External Module
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const DB_PATH =
  "mongodb+srv://root:root@backend.u5zng8f.mongodb.net/Todo?appName=backend";

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorsController = require("./controllers/errors");

let isConnected = false;
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
const app = express();
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongo();
  }
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/items", todoItemsRouter);
app.use(errorsController.pageNotFound);

//const PORT = 3000;

module.exports = app;
