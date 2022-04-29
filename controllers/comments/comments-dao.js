import commentsModel from "./comments-model.js";

export const postAComment = async (recipeID, userID, comment) => {
  comment.commenter = userID;
  comment.recipeID = recipeID;
  const insertedComment = await commentsModel.create(comment);
  return insertedComment;
};

export const findCommentsByRecipe = async (recipeID) =>
  await commentsModel.find({ recipeID });

export const findCommentsByUser = async (userID) =>
  await commentsModel.find({ commenter: userID });

export const deleteCommentById = async (commentID) => {
  await commentsModel.deleteOne({ _id: commentID });
};

export const getCommentById = async (commentID) => {
  await commentsModel.find({ commentID });
};
