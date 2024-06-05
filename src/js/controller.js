
import "core-js/stable"
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import recipeView from './views/recipeView.js'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
  }
}


['hashchange','load'].forEach(ev=>window.addEventListener(ev,controlRecepy))
// window.addEventListener('hashchange',showRecepy)
// window.addEventListener('load',showRecepy)