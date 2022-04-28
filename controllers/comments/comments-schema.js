import mongoose from "mongoose";
const commentsSchema = mongoose.Schema(
  {
    comment: String,
    recipeID: String,
    name: String,
    commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}
  },
  { collection: "comments" }
);
export default commentsSchema;
