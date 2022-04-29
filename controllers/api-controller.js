import Axios from "axios";

const RECIPE_URL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const API_URL =
  "https://api.edamam.com/api/recipes/v2/{$}?type=public&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce";
const API_BASE = process.env.REACT_APP_API_BASE
  ? process.env.REACT_APP_API_BASE
  : "http://localhost:4000/api";

const searchRecipeByName = async (req, res) => {
  const recipeName = req.params.name;
  const recipes = await Axios.get(
    `${RECIPE_URL}${recipeName}&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce`
  );
  return res.json(recipes.data);
};

const searchRecipeByID = async (req, res) => {
  const id = req.params.rid;
  const RECIPE_INFO_URL = API_URL.replace("{$}", id);
  const response = await Axios.get(RECIPE_INFO_URL);
  return res.json(response.data);
};

export const getRecipeLikesAPIByID = async (req, res) => {
  const recipeID = req.params.rid;
  const response = await Axios.get(`${API_BASE}/recipes/${recipeID}`);
  return res.json(response.data);
};

export default (app) => {
  app.get("/api/api/:name", searchRecipeByName);
  app.get("/api/api/recipeID/:rid", searchRecipeByID);
  app.get("/api/api/recipeAPI/:rid", getRecipeLikesAPIByID);
};
