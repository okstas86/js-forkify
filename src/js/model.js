import { async } from "regenerator-runtime"
import { API_URL,RES_PER_PAGE } from './config'
import { getJSON } from "./helper"

export const state = {
  recipe:{},
  search: {
    query: '',
    results: [],
    page:1,
    resultsPerPage:RES_PER_PAGE,
  },
  bookmarks:[]
}

export const loadRecipe = async (id) => {
  try {
    const data=await getJSON(`${API_URL}${id}`)
   
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

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true
    else state.recipe.bookmarked = false

    console.log(state.recipe)
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

export const loadSearchResults = async (query) => {
  try {
    state.search.query=query
    const data = await getJSON(`${API_URL}?search=${query}`)
   
    console.log(data)
    
    state.search.results=data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      }
    })
    state.search.page=1

  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const getSearchresultsPage = (page=state.search.page) => {
  state.search.page=page
  const start =(page-1)*state.search.resultsPerPage //0
  const end= page*state.search.resultsPerPage    //9
  return state.search.results.slice(start,end)
}

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach(ing => {
    
    ing.quantity=(ing.quantity*newServings)/state.recipe.servings
  });
  state.recipe.servings=newServings
}

const persistBokmarks = () => {
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const addBookmark = (recipe) => {
  //add bookmark
  state.bookmarks.push(recipe)

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true
  persistBokmarks()
}

export const deleteBookmark = (id) => {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el=>el.id===id)
  state.bookmarks.splice(index,1)
  
    //Mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false
  persistBokmarks()
}

const init=()=>{
  const storage = localStorage.getItem('bookmarks')
  if(storage) state.bookmarks=JSON.parse(storage)
}

init()

const clearBookmarks = () => {
  localStorage.clear('bookmarks')
}

