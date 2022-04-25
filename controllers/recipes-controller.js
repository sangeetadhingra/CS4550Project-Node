import {
  findAllRecipesDao,
  createRecipeDao,
  deleteRecipeDao,
  updateRecipeDao,
  likeRecipeDao,
  dislikeRecipeDao,
} from "./recipes/recipe-dao.js";

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const recipe = await createRecipeDao(newRecipe);
  res.json(recipe);
};
const findAllRecipes = async (req, res) => {
  const recipes = await findAllRecipesDao();
  res.json(recipes);
};
const updateRecipe = async (req, res) => {
  const recipeID = req.params.rid;
  const updatedRecipe = req.body;
  const status = await updateRecipeDao(recipeID, updatedRecipe);
  res.sendStatus(status);
};
const deleteRecipe = async (req, res) => {
  const recipeID = req.params.rid;
  const status = await deleteRecipeDao(recipeID);
  res.sendStatus(status);
};
const likeRecipe = async (req, res) => {
  const updatedRecipe = req.body;
  const recipe = await likeRecipeDao(updatedRecipe);
  res.json(recipe);
};

const dislikeRecipe = async (req, res) => {
  const updatedRecipe = req.body;
  const recipe = await dislikeRecipeDao(updatedRecipe);
  res.json(recipe);
};
export default (app) => {
  app.post("/api/recipes", createRecipe);
  app.get("/api/recipes", findAllRecipes);
  app.put("/api/recipes/:rid", updateRecipe);
  app.delete("/api/recipes/:rid", deleteRecipe);
  app.put("/api/recipes/like/:rid", likeRecipe);
  app.put("/api/recipes/dislike/:rid", dislikeRecipe);
};
