// =============================================================================
// IMPORTS
// =============================================================================
import { recipes } from '../data/recipes.js';

import {
  searchButton,
  filters,
  filterSearchButtons,
  mainSearch,
  btResetSearchBar,
  filterResetButtons,
} from './utils/variables.js';

import errorMessageEmptyRecipes from './utils/error.js';

import recipesDisplayCounter from './components/counter.js';

import { closeButtonSearchInput, resetSearchBar } from './components/search_bar.js';

import { tagElement, tagsList } from './components/tags.js';

import {
  applianceArray,
  getFilterElements,
  ingredientsArray,
  ustensilsArray,
  filterInputEvent,
  filterResetInput,
  selectItem,
} from './components/filters.js';

import getCards from './components/cards.js';

import { DOMSearch, closeTagBtnDOMEvent } from './utils/search.js';

/**
 * Fonction d'initialisation du DOM
 */
function init() {
  // init DOM
  console.time('recipes init');
  getCards(recipes);
  console.timeEnd('recipes init');

  console.time('ingrédients init');
  getFilterElements(ingredientsArray(recipes), 'ingredients');
  console.timeEnd('ingrédients init');
  console.time('appareils init');
  getFilterElements(applianceArray(recipes), 'appliance');
  console.timeEnd('appareils init');
  console.time('ustensiles init');
  getFilterElements(ustensilsArray(recipes), 'ustensils');
  console.timeEnd('ustensiles init');

  // Events on DOM
  // Input principal
  closeButtonSearchInput('#search', '#search_reset');
  // loop button
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
  });

  // Filters
  // Tags
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
  for (const filterSearchButton of filterSearchButtons) {
    filterSearchButton.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }

  // total recipes
  recipesDisplayCounter();
}

// =============================================================================
// Initialisation du DOM
// =============================================================================
init();

// =============================================================================
// Events after init
// =============================================================================

// filters
// BUG: Importation des variables ne marche pas
const filtersItems = document.querySelectorAll('.filter_list li');
const itemsSelected = document.querySelector('#items_selected');
for (const filterItem of filtersItems) {
  filterItem.addEventListener('click', () => {
    console.time(`Filter search : ${filterItem.textContent}`);

    if (!tagsList().includes(filterItem.textContent) && !filterItem.getAttribute('class')) {
      itemsSelected.appendChild(tagElement(filterItem.textContent));
      selectItem(filterItem);
    } else {
      for (const item of itemsSelected.childNodes) {
        const it = item.textContent.toLowerCase();
        if (it === tagElement(filterItem.textContent).textContent.toLowerCase()) {
          itemsSelected.removeChild(item);
        }
      }
      if (filterItem.getAttribute('class')) {
        filterItem.removeAttribute('class');
        filterItem.removeChild(filterItem.querySelector('button'));
      }
    }
    closeTagBtnDOMEvent();
    recipesDisplayCounter();
    errorMessageEmptyRecipes();

    console.timeEnd(`Filter search : ${filterItem.textContent}`);
  });
}

// input filter event
filterInputEvent('ingredients');
filterInputEvent('appliance');
filterInputEvent('ustensils');

// Main search bar
mainSearch.addEventListener('input', () => {
  // console.time('search bar');
  DOMSearch(mainSearch.value);
  // console.timeEnd('search bar');
  recipesDisplayCounter();
  errorMessageEmptyRecipes();
});

// Reset button of search bar
btResetSearchBar.addEventListener('click', resetSearchBar);

// Reset buttons filter search events
for (const filterResetButton of filterResetButtons) {
  filterResetButton.addEventListener('click', filterResetInput);
}
