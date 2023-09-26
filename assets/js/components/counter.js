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
  for (const className of article.classList) {
    if (className === 'hidden_div') {
      return true;
    }
  }
  return false;
}

/**
 * Fonction qui affiche le nombre de résultats trouvés
 */
function recipesDisplayCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  let hiddenRecipes = 0;
  let displayRecipes = 0;
  for (const article of articles) {
    if (isHiddenRecipe(article)) {
      hiddenRecipes += 1;
    }
  }
  displayRecipes = recipesCounter() - hiddenRecipes;
  totalSpan.textContent = displayRecipes;
}

// =============================================================================
// Exports
// =============================================================================
export { recipesCounter, recipesDisplayCounter };
