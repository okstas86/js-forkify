
import "core-js/stable"
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'

if (module.hot) {
  module.hot.accept()
}

const api='0f554104-2e23-4469-8aac-6ed86821d679'
const controlRecepy = async () => {
  try {
    const id = window.location.hash.slice(1)
    if(!id) return
    recipeView.renderSpinner()
   
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
  resultsView.render(model.state.search.results)
  } catch (error) {
    console.log(error)
    
  }
}


const init = () => {
  recipeView.addHandlerRender(controlRecepy)
  searchView.addHandlerSearch(controlSearchResults)
 }

init()