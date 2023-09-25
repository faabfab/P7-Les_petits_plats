/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
// =============================================================================
// Imports
// =============================================================================
import { closeTagBtnDOMEvent, tagsSearch } from './search.js';

/**
 * Fonction qui renvoi le nombre total de recettes du DOM
 */
function recipesCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  totalSpan.textContent = articles.length;
  return articles.length;
}

/**
 * Fonction qui retourne vrai si l'article est affichée
 * @param {Element} article element à tester
 * @returns boolean
 */
function isHiddenRecipe(article) {
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const className of article.classList) {
    if (className === 'hidden_div') {
      return true;
    }
  }
  return false;
}

/**
 * Fonction qui affiche un message d'erreur si il n'y a pas d'éléments trouvés
 */
function errorMessageEmptyRecipes() {
  const total = document.querySelector('#total');
  const error = document.querySelector('#error-message');
  if (total.textContent === '0') {
    error.innerHTML = '<h3>Aucune recette trouvée</h3>';
  } else { error.innerHTML = ''; }
}

/**
 * Fonction qui affiche le nombre de résultats trouvés
 */
function recipesDisplayCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  let hiddenRecipes = 0;
  let displayRecipes = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    if (isHiddenRecipe(article)) {
      hiddenRecipes += 1;
    }
  }
  displayRecipes = recipesCounter() - hiddenRecipes;
  totalSpan.textContent = displayRecipes;
}

/**
 * Fonction qui retourne l'élément à afficher quand un tag est sélectionné
 * @param {String} name nom du tag dans la listStyle
 * @param {Array} tagsArray liste des tags
 * @returns l'élément à afficher
 */
function tagElement(name, tagsArray) {
  const divItemSelected = document.createElement('div');
  divItemSelected.setAttribute('class', 'item_selected');
  const p = document.createElement('p');
  p.textContent = name;
  divItemSelected.append(p);
  const divItemClose = document.createElement('div');
  divItemClose.setAttribute('class', 'item_selected_close');
  divItemClose.innerHTML = '<svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15" stroke="black" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  tagsArray.push(name);
  divItemClose.addEventListener('click', () => {
    divItemClose.parentElement.remove();
    tagsArray.splice(tagsArray.indexOf(name), 1);
    closeTagBtnDOMEvent();
    recipesDisplayCounter();
    errorMessageEmptyRecipes();
  });
  divItemSelected.appendChild(divItemClose);
  return divItemSelected;
}

/**
 * Fonction qui affiche ou efface le bouton reset
 * @param {Element} input champ de recherche
 * @param {Element} closeButton Button
 */
function closeButtonSearchInput(input, closeButton) {
  const search = document.querySelector(input);
  const reset = document.querySelector(closeButton);
  reset.addEventListener('click', () => {
    reset.classList.add('hidden_div');
  });
  search.onkeyup = () => {
    if (search.value.length >= 3) {
      reset.classList.remove('hidden_div');
    } else {
      reset.classList.add('hidden_div');
    }
  };
}

/**
 * Fonction qui affiche les articles quand on supprime les caractères de la barre de recherche
 */
function resetSearchBar() {
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.classList.remove('hidden_div');
    tagsSearch();
    recipesDisplayCounter();
  });
}

/**
 * Fonction qui détermine les événements sur les inputs des filtres
 * @param {String} filterName nom du filter
 */
function filterInputEvent(filterName) {
  const filterInput = document.querySelector(`#${filterName}_search_input`);
  filterInput.addEventListener('input', () => {
    const filterList = document.querySelector(`#${filterName}_list`);
    const filterItems = filterList.querySelectorAll('li');
    if (filterInput.value.length >= 3) {
      // console.log(filterInput.value);
      filterItems.forEach((filterItem) => {
        if (filterItem.textContent.toLowerCase().includes(filterInput.value.toLowerCase())) {
          filterItem.removeAttribute('class');
        } else {
          filterItem.setAttribute('class', 'hidden_div');
        }
      });
    } else {
      filterItems.forEach((filterItem) => {
        filterItem.removeAttribute('class');
      });
    }
  });
}

/**
 * Fonction qui affiche la liste complète des tags quand l'input correspondant est vide
 */
function filterResetInput() {
  const parent = (this.parentElement).parentElement;
  const items = parent.querySelectorAll('li');
  items.forEach((item) => {
    item.removeAttribute('class');
  });
}

// =============================================================================
// Exports
// =============================================================================
export {
  recipesCounter,
  tagElement,
  closeButtonSearchInput,
  resetSearchBar,
  recipesDisplayCounter,
  errorMessageEmptyRecipes,
  filterInputEvent,
  filterResetInput,
};
