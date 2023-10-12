import { totalSpan, error } from './variables.js';

/**
 * Fonction qui affiche un message d'erreur si il n'y a pas d'éléments trouvés
 */
function errorMessageEmptyRecipes() {
  if (totalSpan.textContent === '0') {
    error.innerHTML = '<h3>Aucune recette trouvée</h3>';
  } else { error.innerHTML = ''; }
}

// =============================================================================
// Exports
// =============================================================================
export default errorMessageEmptyRecipes;
