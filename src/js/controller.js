
import "core-js/stable"
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import recipeView from './views/recipeView.js'

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



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

const init = () => {
  recipeView.addHandlerRender(controlRecepy)
 }

init()