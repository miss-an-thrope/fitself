//Api key/id
const REACT_APP_EDAMAM_API_KEY = "10a0d5ee723a36a254b681e7a1db9171"
const REACT_APP_EDAMAM_APP_ID = "a626f9ed"

const EDAMAM_API_FOOD_KEY = "bd44c11ac528080f08e400ce45f8d3a5"
const EDAMAM_API_FOOD_ID = "ff193a7e"

export async function fetchRecipes(filter) {
    const { query, limit } = filter
    const url = `https://api.edamam.com/search?q=${query}&app_id=${REACT_APP_EDAMAM_APP_ID}&app_key=${REACT_APP_EDAMAM_API_KEY}&from=0&to=${limit}&`

    const response = await fetch(url)

    const data = await response.json()

    return data?.hits
}

export async function fetchRecipe(id) {
    const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${REACT_APP_EDAMAM_APP_ID}&app_key=${REACT_APP_EDAMAM_API_KEY}`

    const response = await fetch(url)

    const data = await response.json()

    return data[0]
}

export async function fetchFoods() {
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_API_FOOD_ID}&app_key=${EDAMAM_API_FOOD_KEY}`

    const response = await fetch(url)

    const data = await response.json()

    return data?.hints
}

export default async function fetchFood(ingredient) {
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_API_FOOD_ID}&app_key=${EDAMAM_API_FOOD_KEY}&ingr=${ingredient}`

    const response = await fetch(url)

    const data = await response.json()

    return data?.hints
}
