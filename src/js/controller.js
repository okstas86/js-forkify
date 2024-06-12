
import "core-js/stable"
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from "./views/paginationView.js"

if (module.hot) {
  module.hot.accept()
}

const api='0f554104-2e23-4469-8aac-6ed86821d679'
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
    resultsView.render(model.getSearchresultsPage(3))

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


const init = () => {
  recipeView.addHandlerRender(controlRecepy)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)

 }

init()