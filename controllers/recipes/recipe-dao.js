import recipeModel from "./recipe-model.js";

export const findAllRecipesDao = async () => {
  return await recipeModel.find();
};
export const findRecipeByIdDao = async (recipeID) => {
  return await recipeModel.findOne({ rid: recipeID });
};

export const createRecipeDao = async (recipe) => {
  // Checking for duplicates
  const existingRecipe = await recipeModel.findOne({ rid: recipe.rid });
  if (existingRecipe) {
    return 302;
  }
  try {
    recipeModel.create({
      ...recipe,
      likes: 0,
      dislikes: 0,
    });
  } catch (e) {
    console.log(e);
    return 500;
  }
  return 201;
};
export const deleteRecipeDao = (recipeID) => {
  recipeModel.deleteOne({ rid: recipeID });
  return 200;
};
export const updateRecipeDao = (recipeID, recipe) => {
  recipeModel.updateOne({ rid: recipeID }, { $set: recipe });
  return 200;
};
export const likeRecipeDao = async (recipe) => {
  console.log(recipe.rid)
  let existingRecipe = await recipeModel.findOne({ rid: recipe.rid });
  if (!existingRecipe) {
    try {
      existingRecipe = recipeModel.create({
        ...recipe,
        likes: 1,
        dislikes: 0,
      });
    } catch (e) {
      console.log(e);
    }
  }
 else {
  await recipeModel.updateOne({ rid: recipe.rid }, { $set: { likes: existingRecipe.likes + 1} });
  existingRecipe.likes++;
  }
  return existingRecipe;
};

export const dislikeRecipeDao = async (recipe) => {
  let existingRecipe = await recipeModel.findOne({ rid: recipe.rid });
  if (!existingRecipe) {
    try {
      existingRecipe = recipeModel.create({
        ...recipe,
        likes: 0,
        dislikes: 1,
      });
    } catch (e) {
      console.log(e);
    }
  }
 else {
  await recipeModel.updateOne({ rid: recipe.rid }, { $set: { dislikes: existingRecipe.dislikes + 1} });
  existingRecipe.dislikes++;
  }
  return existingRecipe;
};
