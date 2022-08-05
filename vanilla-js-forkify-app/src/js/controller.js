import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import View from './views/View.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; // ECM5
import 'regenerator-runtime/runtime'; // polyflying async and await
import { async } from 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2
// c99af33a-9a3b-4699-b188-42bf13293dc1
// 0a4552d6-135d-4d35-8170-852f7f768363

///////////////////////////////////////

// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipes = async function() {
	try {

        const id = window.location.hash.slice(1);
        if (!id) return;
        
        recipeView.renderSpinner();

        // Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());

        // Update bookmarks view
        bookmarksView.update(model.state.bookmarks);

        // Loading recipe
	    await model.loadRecipe(id);

        // Rendering recipe
        recipeView.render(model.state.recipe);

	} catch (err) {
        recipeView.renderError();
		console.log(err);
	}
}

const controlSearchResults = async function() {
    try {

        resultsView.renderSpinner();

        // Get search query
        const query = searchView.getQuery();
        if ( !query ) return;

        // Load search results
        await model.loadSearchResults(query);

        // Render results
        resultsView.render(model.getSearchResultsPage());

        // Render initial pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
}

controlPagination = function(goToPage) {
    // Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // Render NEW initial pagination
    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
    // Add/remove bookmark
    if ( model.state.recipe.bookmarked ) {
        model.deleteBookmark(model.state.recipe.id);
    } else {
        model.addBookmark(model.state.recipe);
    }

    // Update recipe view
    recipeView.update(model.state.recipe);

    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {

    console.log(newRecipe);

    try {
        // Show loading spinner
        addRecipeView.renderSpinner();

        // Upload recipe
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        // Render recipe
        recipeView.render(model.state.recipe);

        // Success message
        addRecipeView.renderMessage();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // Close form if user didn't close it earlier
        setTimeout(function(){
            addRecipeView.toggleWindow('close');
        }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }
    
}

const init = function() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);

}
init();
