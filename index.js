import express from "express";
import recipeController from "./controllers/recipes-controller.js";
import cors from "cors";
import mongoose from "mongoose";
import userController from "./controllers/user-controller.js";
import apiController from "./controllers/api-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());

recipeController(app);
userController(app);
apiController(app);
app.listen(process.env.PORT || 4000);
