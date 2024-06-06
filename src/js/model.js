import { async } from "regenerator-runtime"
import { API_URL } from './config'
import { getJSON } from "./helper"

export const state = {
  recipe:{}
}

export const loadRecipe = async (id) => {
  try {
    const data=await getJSON(`${API_URL}/${id}`)
   
    const { recipe } = data.data
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourseUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    console.log(state.recipe)
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}