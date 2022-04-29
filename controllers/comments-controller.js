import {
  postAComment,
  findCommentsByRecipe,
  findCommentsByUser,
  deleteCommentById,
  getCommentById,
} from "./comments/comments-dao.js";
import { findUserById } from "./users/user-dao.js";

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
  const userID = req.params.userID;
  const comments = await findCommentsByUser(userID);
  console.log(comments);
  res.json(comments);
};

const findCommentsByRecipeID = async (req, res) => {
  const recipeID = req.params.recipeID;
  const comments = await findCommentsByRecipe(recipeID);
  res.json(comments);
};

const deleteComment = async (req, res) => {
  const commentId = req.params.commentID;
  const userID = req.params.userID;
  const comment = await getCommentById(commentId);
  const user = await findUserById(userID);
  if (user.role === "ADMIN" || comment.commenter.toString() === userID) {
    await deleteCommentById(commentId);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

export default (app) => {
  app.post("/api/recipeDetails/:recipeID/comments/:userID", postComment);
  app.get("/api/comments/:recipeID", findCommentsByRecipeID);
  app.get("/api/comments/users/:userID", findCommentsByUserID);
  app.delete("/api/comments/:commentID/:userID", deleteComment);
};
