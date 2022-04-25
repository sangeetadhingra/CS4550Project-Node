import mongoose from "mongoose";
import recipeSchema from "./recipe-schema.js";
const recipeModel = mongoose.model("RecipeModel", recipeSchema);
export default recipeModel;
