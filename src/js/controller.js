
import "core-js/stable"
import { MODAL_CLOSE_SEC } from "./config.js"
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from "./views/paginationView.js"
import addRecipeView from "./views/addRecipeView.js"

if (module.hot) {
  module.hot.accept()
}


const controlRecepy = async () => {
  try {
    const id = window.location.hash.slice(1)
    if(!id) return
    recipeView.renderSpinner()

    //update results view to mark selected search result
    resultsView.update(model.getSearchresultsPage())
    
    //loading recipe
    await model.loadRecipe(id)
    
    //rendering recipe
    recipeView.render(model.state.recipe)
    
    //updating bookmarks view
    bookmarksView.update(model.state.bookmarks)
  } catch (error) {
    console.log(error)
    recipeView.renderError()
  }
}

const controlSearchResults = async () => {
  try {

    resultsView.renderSpinner()
   

    //get search query
    const query = searchView.getQuery()
    if (!query) return
    
    //load search results
    await model.loadSearchResults(query)

    //render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchresultsPage(1))

    //Render initial pagination button
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error)
    
  }
}

const controlPagination = (goToPage) => {
  console.log(goToPage)
    
    resultsView.render(model.getSearchresultsPage(goToPage))

    //Render initial pagination button
    paginationView.render(model.state.search)

}

const controlServings = (newServings) => {
  //update the recipe servings

  model.updateServings(newServings)

  //update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
  
}

const controlAddBookmark = () => {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

 //update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async(newRecipe) => {
  try {
  
    //show loading spinner
    addRecipeView.renderSpinner()
    
  //upload recepy data
 await model.uploadRecipe(newRecipe)
  console.log(model.state.recipe)

   
  //Render recipe
  recipeView.render(model.state.recipe)

  //Success message
    addRecipeView.renderMessage()
    
    //Render bookmarks
    bookmarksView.render(model.state.bookmarks)

    //Change Id in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

  //Close form window
  setTimeout(() => {
    addRecipeView.toggleWindow()
  },MODAL_CLOSE_SEC*1000)
 
} catch (error) {
  console.error('controlAddRecipe:', error)
  addRecipeView.renderError(error.message)
}
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecepy)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
 }

init()