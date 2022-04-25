import mongoose from "mongoose";
const recipeSchema = mongoose.Schema(
  {
    rid: { type: String, unique: true },
    title: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { collection: "recipes" }
);
export default recipeSchema;
