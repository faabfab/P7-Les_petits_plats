// =============================================================================
// IMPORTS
// =============================================================================
import { recipes } from '../data/recipes.js';

import errorMessageEmptyRecipes from './utils/error.js';

import { closeButtonSearchInput, resetSearchBar } from './components/search_bar.js';

import { tagElement } from './components/tags.js';

import {
  applianceArray,
  getFilterElements,
  ingredientsArray,
  ustensilsArray,
  filterInputEvent,
  filterResetInput,
} from './components/filters.js';

import getCards from './components/cards.js';

import { recipesCounter, recipesDisplayCounter } from './components/counter.js';

import { DOMSearch, searchByTag } from './utils/search.js';

/**
 * Fonction d'initialisation du DOM
 */
function init() {
  // init DOM
  getCards(recipes);

  getFilterElements(ingredientsArray(recipes), 'ingredients');
  getFilterElements(applianceArray(recipes), 'appliance');
  getFilterElements(ustensilsArray(recipes), 'ustensils');

  // Events on DOM
  // Input principal
  closeButtonSearchInput('#search', '#search_reset');
  // loop button
  const searchButton = document.querySelector('#search_button');
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
  });

  // Filters
  // Tags
  const filters = document.querySelectorAll('.filter');
  for (const filter of filters) {
    const filterListBtn = filter.querySelector('.filter_list_btn');
    const filterListState = filter.querySelector('.filter_list_state');
    const filterListContent = filter.querySelector('.filter_list_content');

    filterListBtn.addEventListener('click', () => {
      if (filter.getAttribute('data-state') === 'close') {
        filterListState.innerHTML = '<img src="/assets/img/list_close.svg" alt="list close"></img>';
        filterListContent.classList.remove('hidden_div');
        filter.setAttribute('data-state', 'open');
      } else {
        filterListState.innerHTML = '<img src="/assets/img/list_open.svg" alt="list open"></img>';
        filterListContent.classList.add('hidden_div');
        filter.setAttribute('data-state', 'close');
      }
    });
  }
  // search input
  closeButtonSearchInput('#ingredients_search_input', '#ingredients_btn_reset');
  closeButtonSearchInput('#appliance_search_input', '#appliance_btn_reset');
  closeButtonSearchInput('#ustensils_search_input', '#ustensils_btn_reset');

  // loop buttons
  const filterSearchButtons = document.querySelectorAll('.filter_btn_submit');
  for (const filterSearchButton of filterSearchButtons) {
    filterSearchButton.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }

  // total recipes
  recipesCounter();
}

// =============================================================================
// Initialisation du DOM
// =============================================================================
init();

// =============================================================================
// Events after init
// =============================================================================

// filters
const tagsArray = []; // tags selected array

const filtersItems = document.querySelectorAll('.filter_list li');
const itemsSelected = document.querySelector('#items_selected');
for (const filterItem of filtersItems) {
  filterItem.addEventListener('click', () => {
    if (!tagsArray.includes(filterItem.textContent)) {
      itemsSelected.appendChild(tagElement(filterItem.textContent, tagsArray));
      searchByTag(filterItem.textContent, filterItem.parentElement.getAttribute('id'));
      recipesDisplayCounter();
      errorMessageEmptyRecipes();
    }
  });
}

// input filter event
filterInputEvent('ingredients');
filterInputEvent('appliance');
filterInputEvent('ustensils');

// Main search bar
const mainSearch = document.querySelector('#search');
mainSearch.addEventListener('input', () => {
  DOMSearch(mainSearch.value);
  recipesDisplayCounter();
  errorMessageEmptyRecipes();
});

// Reset button of search bar
const btResetSearchBar = document.querySelector('#search_reset');
btResetSearchBar.addEventListener('click', resetSearchBar);

// Reset buttons filter search events
const filterResetButtons = document.querySelectorAll('.filter_btn_reset');
for (const filterResetButton of filterResetButtons) {
  filterResetButton.addEventListener('click', filterResetInput);
}
