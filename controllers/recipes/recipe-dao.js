import recipeModel from "./recipe-model.js";

export const findAllRecipesDao = () => {
  recipeModel.find();
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
  console.log(recipe);
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
  let existingRecipe = await recipeModel.findOne({ rid: recipe.rid });
  if (!existingRecipe) {
    createRecipeDao(recipe);
  }
  const likes = existingRecipe ? existingRecipe.likes + 1 : 1;
  await recipeModel.updateOne({ rid: recipe.rid }, { $set: { likes: likes } });
  existingRecipe.likes++;
  console.log(existingRecipe);
  return existingRecipe;
};

export const dislikeRecipeDao = async (recipe) => {
  let existingRecipe = await recipeModel.findOne({ rid: recipe.rid });
  if (!existingRecipe) {
    createRecipeDao(recipe);
  }
  recipeModel.updateOne(
    { rid: recipe.rid },
    { $set: { dislikes: recipe.dislikes + 1 } }
  );
  const dislikes = existingRecipe ? existingRecipe.dislikes + 1 : 1;
  await recipeModel.updateOne(
    { rid: recipe.rid },
    { $set: { dislikes: dislikes } }
  );
  existingRecipe.dislikes++;
  console.log(existingRecipe);
  return existingRecipe;
};
