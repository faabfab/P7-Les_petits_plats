// =============================================================================
// Imports
// =============================================================================
import { closeTagBtnDOMEvent } from '../utils/search.js';
import recipesDisplayCounter from './counter.js';
import errorMessageEmptyRecipes from '../utils/error.js';
import { filterArray, removeSelectedClass } from './filters.js';

/**
 * Fonction qui retourne le nom du filtre si name en fait partie faux sinon
 * @param {String} name nom à tester
 * @param {String} filterName nom du filtre
 * @returns filterName or false
 */
function tagInFilter(name, filterName) {
  if (filterArray(filterName).includes(name)) {
    return filterName;
  }
  return false;
}

/**
   * Fonction qui retourne le nom du filtre auquel name appartient
   * @param {String} name nom du tag
   * @returns {String} nom de filtre
   */
function whatFilter(name) {
  let filterName = '';
  if (tagInFilter(name, 'ingredients')) {
    filterName = tagInFilter(name, 'ingredients');
  }
  if (tagInFilter(name, 'appliance')) {
    filterName = tagInFilter(name, 'appliance');
  }
  if (tagInFilter(name, 'ustensils')) {
    filterName = tagInFilter(name, 'ustensils');
  }
  return filterName;
}

/**
 * Fonction qui retourne l'élément à afficher quand un tag est sélectionné
 * @param {String} name nom du tag dans la listStyle
 * @returns l'élément à afficher
 */
function tagElement(name) {
  const divItemSelected = document.createElement('div');
  divItemSelected.setAttribute('class', 'item_selected');
  const p = document.createElement('p');
  p.textContent = name;
  divItemSelected.append(p);
  const divItemClose = document.createElement('div');
  divItemClose.setAttribute('class', 'item_selected_close');
  divItemClose.innerHTML = '<svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15" stroke="black" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  divItemClose.addEventListener('click', () => {
    divItemClose.parentElement.remove();
    filterArray(whatFilter(name)).forEach((filterName) => {
      if (filterName.toLowerCase() === name.toLowerCase()) {
        removeSelectedClass(whatFilter(name), filterName);
      }
    });
    closeTagBtnDOMEvent();
    recipesDisplayCounter();
    errorMessageEmptyRecipes();
  });
  divItemSelected.appendChild(divItemClose);
  return divItemSelected;
}

/**
   * Fonction qui retourne le tableau des tags sélectionnés
   * @returns {Array}
   */
function tagsList() {
  const tagsArray = [];
  const tagsDiv = document.querySelectorAll('.item_selected');
  tagsDiv.forEach((tag) => {
    const p = tag.querySelector('p');
    tagsArray.push(p.textContent);
  });
  return tagsArray;
}

function removeTag(tagItem) {
  tagItem.parentElement.remove(tagItem);
}

// =============================================================================
// Exports
// =============================================================================
export {
  tagElement,
  tagInFilter,
  whatFilter,
  tagsList,
  removeTag,
};
