/* eslint-disable import/extensions */
// =============================================================================
// IMPORTS
// =============================================================================
import { recipes } from '../data/recipes.js';
import { recipesCounter, tagElement } from './utils/ModulesEvents.js';

import {
  applianceArray,
  getCards,
  getFilterElements,
  ingredientsArray,
  ustensilsArray,
} from './utils/datasDOMDisplay.js';

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
  const search = document.querySelector('#search');
  const reset = document.querySelector('#search_reset');
  reset.addEventListener('click', () => {
    reset.setAttribute('class', 'hidden_div');
  });
  search.onkeyup = () => {
    if (search.value.length >= 3) {
      reset.removeAttribute('class');
    }
    else {
      reset.setAttribute('class', 'hidden_div');
    }
  };

  // Filters
  // TODO: Événements sur les filtres
  const filters = document.querySelectorAll('.filter')
  filters.forEach((filter) => {
    const filterListBtn = filter.querySelector('.filter_list_btn');
    const filterListState = filter.querySelector('.filter_list_state');
    const filterListContent = filter.querySelector('.filter_list_content')
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

  // total recipes
  recipesCounter();
}

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
    // FIXME: Afficher le tag correspondant
    if (!tagsArray.includes(filterItem.textContent)) {
      itemsSelected.appendChild(tagElement(filterItem.textContent, tagsArray));
      //console.log(tagsArray);
    }
  });
});
