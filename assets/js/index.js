/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import { recipes } from '../data/recipes.js';

import { getCards } from './utils/datas.js';
import { searchEvent } from './utils/ModulesEvents.js';

function init() {
  // DOM init
  getCards(recipes);

  // DOM Events
  // Input principal
  // FIXME: reset après 3 caractères
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
}

// filters
// TODO: evenemets sur les filtres
const filters = document.querySelectorAll('.filter')
filters.forEach((filter) => {
  const filterListState = filter.querySelector('.filter_list_state');
  const filterListContent = filter.querySelector('.filter_list_content')
  filter.addEventListener('click', () => {
    if (filter.getAttribute('data-state') == 'close') {
      filterListState.innerHTML = '<img src="/assets/img/list_close.svg" alt=""></img>';
      filterListContent.classList.remove('hidden_div');
      filter.setAttribute('data-state', 'open');
    } else {
      filterListState.innerHTML = '<img src="/assets/img/list_open.svg" alt=""></img>';
      filterListContent.classList.add('hidden_div');
      filter.setAttribute('data-state', 'close');
    }
  });
});

init();
