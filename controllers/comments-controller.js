import {
  postAComment,
  findCommentsByRecipe,
  findCommentsByUser,
} from "./comments/comments-dao.js";

const postComment = async (req, res) => {
  const comment = req.body;
  console.log(comment);
  const recipeId = req.params.recipeID;
  const userId = req.params.userID;
  const addComment = await postAComment(recipeId, userId, comment);
  console.log(addComment);
  res.json(addComment);
};

const findCommentsByUserID = async (req, res) => {
  const userID = req.params.userId;
  const comments = await findCommentsByUser(userID);
  console.log(comments);
  res.json(comments);
};

const findCommentsByRecipeID = async (req, res) => {
  const recipeID = req.params.recipeID;
  const comments = await findCommentsByRecipe(recipeID);
  res.json(comments);
};

export default (app) => {
  app.post("/api/recipeDetails/:recipeID/comments/:userID", postComment);
  app.get("/api/comments/:recipeID", findCommentsByRecipeID);
  app.get("/api/comments/users/:userId", findCommentsByUserID);
};
