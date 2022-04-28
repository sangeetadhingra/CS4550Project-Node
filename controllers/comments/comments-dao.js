import commentsModel from "./comments-model.js";

export const postAComment = async (recipeID, userID, comment) => {
    comment.commenter = userID;
    comment.recipeID = recipeID;
    const insertedComment = await commentsModel.create(comment);
    return insertedComment;
}

export const findCommentsByRecipe = (recipeID) =>
  commentsModel.find({recipeID})

export const findCommentsByUser = (userID) =>
  commentsModel.find({commenter: userID})
