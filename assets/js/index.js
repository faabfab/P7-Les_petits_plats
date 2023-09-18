/* eslint-disable import/extensions */
// =============================================================================
// IMPORTS
// =============================================================================
import { recipes } from '../data/recipes.js';
import { closeButtonSearchInput, recipesCounter, resetSearchBar, tagElement } from './utils/ModulesEvents.js';

import {
  applianceArray,
  getCards,
  getFilterElements,
  ingredientsArray,
  ustensilsArray,
} from './utils/datasDOMDisplay.js';

import { DOMSearch, searchByTag } from './utils/searchModules.js';

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

  // Filters
  // TODO: Événements sur les filtres
  // Tags
  const filters = document.querySelectorAll('.filter')
  filters.forEach((filter) => {
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
  });
  // search input
  closeButtonSearchInput('#ingredients_search_input', '#ingredients_btn_reset');
  closeButtonSearchInput('#appliance_search_input', '#appliance_btn_reset');
  closeButtonSearchInput('#ustensils_search_input', '#ustensils_btn_reset');

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
filtersItems.forEach((filterItem) => {
  filterItem.addEventListener('click', () => {
    if (!tagsArray.includes(filterItem.textContent)) {
      itemsSelected.appendChild(tagElement(filterItem.textContent, tagsArray));
      // TODO: Recherche selon le tag
      searchByTag(filterItem.textContent, filterItem.parentElement.getAttribute('id'));
    }
  });
});

// Main search bar
const total = document.querySelector('#total');
const mainSearch = document.querySelector('#search');
const totalDOM = total.textContent;
const errorDiv = document.querySelector('#error-message');
mainSearch.addEventListener('input', () => {
  total.textContent = totalDOM - DOMSearch(mainSearch.value);
  if (totalDOM - DOMSearch(mainSearch.value) === 0) {
    errorDiv.innerHTML = '<h3>Pas de correspondance !!!</h3>';
  } else { errorDiv.innerHTML = ''; }
});

// Reset button of search bar
const btResetSearchBar = document.querySelector('#search_reset');
btResetSearchBar.addEventListener('click', resetSearchBar);

// TODO: Résultats sur la loupe
