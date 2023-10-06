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
  for (const element of jsonConst) {
    for (const el of element.ingredients) {
      if (!(ingredientsList.includes(el.ingredient))) {
        ingredientsList.push(el.ingredient);
      }
    }
  }
  return ingredientsList;
}

/**
   * Fonction qui retourne le tableau des appareils sans redondances
   * @param {Array} jsonConst tableau des recettes
   * @returns Array
   */
function applianceArray(jsonConst) {
  const applianceList = [];
  for (const element of jsonConst) {
    if (!applianceList.includes(element.appliance)) {
      applianceList.push(element.appliance);
    }
  }
  return applianceList;
}

/**
   * Fonction qui retourne le tableau des ustensiles sans redondances
   * @param {Array} jsonConst tableau des recettes
   * @returns Array
   */
function ustensilsArray(jsonConst) {
  const ustensilsList = [];
  for (const element of jsonConst) {
    for (const el of element.ustensils) {
      if (!ustensilsList.includes(el.toLowerCase())) {
        ustensilsList.push(el.toLowerCase());
      }
    }
  }
  return ustensilsList;
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
  for (const filterElement of filterElements.childNodes) {
    arrayTags.push(filterElement.textContent);
  }
  return arrayTags;
}

/**
 * Fonction qui enlève la classe selected de name
 * @param {String} filterName nom de le catégorie du filtre
 * @param {String} name nom du filtre
 */
function removeSelectedClass(filterName, name) {
  const idFilter = `#${filterName}_list`;
  const filter = document.querySelector(idFilter);
  const filterElements = filter.querySelectorAll('li');
  for (const filterItem of filterElements) {
    if (filterItem.textContent.toLowerCase() === name.toLowerCase()) {
      const closeButton = filterItem.querySelector('button');
      filterItem.removeChild(closeButton);
      filterItem.removeAttribute('class');
    }
  }
}

/**
   * Fonction qui affiche la liste des tags
   * @param {Array} arrayOfFilter tableau de fil
   * @param {String} filter nom du filtre
   */
function getFilterElements(arrayOfFilter, filter) {
  const idFilter = `#${filter}_list`;
  const ingredientsList = document.querySelector(idFilter);
  for (const element of arrayOfFilter) {
    const li = document.createElement('li');
    li.textContent = element;
    ingredientsList.appendChild(li);
  }
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
    // TODO: Faire leave early
    if (filterInput.value.length >= 3) {
      for (const filterItem of filterItems) {
        if (filterItem.textContent.toLowerCase().includes(filterInput.value.toLowerCase())) {
          filterItem.removeAttribute('class');
        } else {
          filterItem.setAttribute('class', 'hidden_div');
        }
      }
    } else {
      for (const filterItem of filterItems) {
        filterItem.removeAttribute('class');
      }
    }
  });
}

/**
   * Fonction qui affiche la liste complète des tags quand l'input correspondant est vide
   */
function filterResetInput() {
  const parent = (this.parentElement).parentElement;
  const items = parent.querySelectorAll('li');
  for (const item of items) {
    item.removeAttribute('class');
  }
}

/**
 * Fonction  qui affiche le tag
 * @param {Element} filterItem dans la liste des filtres
 */
function selectItem(filterItem) {
  filterItem.setAttribute('class', 'filter_list_li_selected');
  const closeItemSelected = document.createElement('button');
  closeItemSelected.setAttribute('class', 'close_filter_list_li_selected');
  closeItemSelected.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="8.5" fill="black"/><path d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11" stroke="#FFD15B" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  filterItem.appendChild(closeItemSelected);
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
  selectItem,
  removeSelectedClass,
};
