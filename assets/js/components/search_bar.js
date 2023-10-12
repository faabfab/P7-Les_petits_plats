// =============================================================================
// Imports
// =============================================================================
import { tagsSearch } from '../utils/search.js';
import recipesDisplayCounter from './counter.js';

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
  for (const article of articles) {
    article.classList.remove('hidden_div');
    tagsSearch();
    recipesDisplayCounter();
  }
}

// =============================================================================
// Exports
// =============================================================================
export { closeButtonSearchInput, resetSearchBar };
