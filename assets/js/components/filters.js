// =============================================================================
// FILTERS
// =============================================================================

/**
 * Fonction qui retourne le tableau des ingrédients sans redondances
 * @param {Array} jsonConst tableau des recettes
 * @returns Array
 */
function ingredientsArray(jsonConst) {
  const ingredientsList = [];
  jsonConst.forEach((element) => {
    element.ingredients.forEach((el) => {
      if (!(ingredientsList.includes(el.ingredient))) {
        ingredientsList.push(el.ingredient);
      }
    });
  });
  return ingredientsList;
}

/**
   * Fonction qui retourne le tableau des appareils sans redondances
   * @param {Array} jsonConst tableau des recettes
   * @returns Array
   */
function applianceArray(jsonConst) {
  const applianceList = [];
  jsonConst.forEach((element) => {
    if (!applianceList.includes(element.appliance)) {
      applianceList.push(element.appliance);
    }
  });
  return applianceList;
}

/**
   * Fonction qui retourne le tableau des ustensiles sans redondances
   * @param {Array} jsonConst tableau des recettes
   * @returns Array
   */
function ustensilsArray(jsonConst) {
  const ustensilsList = [];
  jsonConst.forEach((element) => {
    element.ustensils.forEach((el) => {
      if (!ustensilsList.includes(el)) {
        ustensilsList.push(el);
      }
    });
  });
  return ustensilsList;
}

/**
   * Fonction qui affiche la liste des tags
   * @param {Array} filterArray tableau de fil
   * @param {String} filter nom du filtre
   */
function getFilterElements(filterArray, filter) {
  const idFilter = `#${filter}_list`;
  const ingredientsList = document.querySelector(idFilter);
  filterArray.forEach((element) => {
    const li = document.createElement('li');
    li.textContent = element;
    ingredientsList.appendChild(li);
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

/**
 * Fonction qui renvoi le tableau des tags du filtre correspondant
 * @param {String} filterName nom du filtre
 * @returns Tableau des tags du filter
 */
function filterArray(filterName) {
  const arrayTags = [];
  const idFilter = `#${filterName}_list`;
  const filterElements = document.querySelector(idFilter);
  filterElements.childNodes.forEach((filterElement) => {
    arrayTags.push(filterElement.textContent);
  });
  return arrayTags;
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  ingredientsArray,
  applianceArray,
  ustensilsArray,
  getFilterElements,
  filterInputEvent,
  filterResetInput,
  filterArray,
};
