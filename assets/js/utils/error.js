/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
// =============================================================================
// Imports
// =============================================================================

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

// =============================================================================
// Exports
// =============================================================================
export default errorMessageEmptyRecipes;
