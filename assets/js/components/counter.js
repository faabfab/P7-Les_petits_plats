// import { articles, totalSpan } from '../utils/variables.js';

/**
 * Fonction qui retourne vrai si l'article est affichée
 * @param {Element} article element à tester
 * @returns boolean
 */
function isHiddenRecipe(article) {
  let res = false;
  article.classList.forEach((className) => {
    if (className === 'hidden_div') {
      res = true;
    }
  });
  return res;
}

/**
 * Fonction qui affiche le nombre de résultats trouvés
 */
function recipesDisplayCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  let totalRecipes = 0;
  let hiddenRecipes = 0;
  let displayRecipes = 0;
  articles.forEach((article) => {
    totalRecipes += 1;
    if (isHiddenRecipe(article)) {
      hiddenRecipes += 1;
    }
  });
  displayRecipes = totalRecipes - hiddenRecipes;
  totalSpan.textContent = displayRecipes;
}

// =============================================================================
// Exports
// =============================================================================
export default recipesDisplayCounter;
