/* EDAMAM API KEY/ID */
// => RecipesPage
const EDAMAM_APP_RECIPE_ID = '8ad279a0';
const EDAMAM_API_RECIPE_KEY = 'c537938db06946dbb05a1abb3b06ebe5';
// => FoodsPage
const EDAMAM_API_FOOD_ID = 'ff193a7e';
const EDAMAM_API_FOOD_KEY = 'bd44c11ac528080f08e400ce45f8d3a5';

export async function fetchRecipes(filter) {
  const { query, from, to } = filter;
  const url = `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_RECIPE_ID}&app_key=${EDAMAM_API_RECIPE_KEY}&from=${from}&to=${to}`;

  const response = await fetch(url);

  const data = await response.json();

  return data?.hits;
}


export async function fetchRecipe(id) {
  const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${EDAMAM_APP_RECIPE_ID}&app_key=${EDAMAM_API_RECIPE_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data[0];
}

export async function fetchFoods() {
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_API_FOOD_ID}&app_key=${EDAMAM_API_FOOD_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data?.hints;
}

export default async function fetchFood(ingredient) {
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_API_FOOD_ID}&app_key=${EDAMAM_API_FOOD_KEY}&ingr=${ingredient}`

  const response = await fetch(url)

  const data = await response.json()

  return data?.hints
}
