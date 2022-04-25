import express from "express";
import recipeController from "./controllers/recipes-controller.js";
import cors from "cors";
import mongoose from "mongoose";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors());
app.use(express.json());

recipeController(app);
app.listen(process.env.PORT || 4000);
