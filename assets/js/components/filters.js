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
      if (!ustensilsList.includes(el.toLowerCase())) {
        ustensilsList.push(el.toLowerCase());
      }
    });
  });
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
  filterElements.childNodes.forEach((filterElement) => {
    arrayTags.push(filterElement.textContent);
  });
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
  filterElements.forEach((filterItem) => {
    if (filterItem.textContent.toLowerCase() === name.toLowerCase()) {
      const closeButton = filterItem.querySelector('.close_filter_list_li_selected');
      if (closeButton) {
        filterItem.removeChild(closeButton);
      }
      filterItem.removeAttribute('class');
    }
  });
}

/**
   * Fonction qui affiche la liste des tags
   * @param {Array} arrayOfFilter tableau de fil
   * @param {String} filter nom du filtre
   */
function getFilterElements(arrayOfFilter, filter) {
  const idFilter = `#${filter}_list`;
  const ingredientsList = document.querySelector(idFilter);
  arrayOfFilter.forEach((element) => {
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
    if ((filterInput.value.length < 3) || !(filterInput.value.match(/^([a-zA-Z0-9 ]+)$/))) {
      filterItems.forEach((filterItem) => {
        filterItem.removeAttribute('class');
      });
      return;
    }
    for (const filterItem of filterItems) {
      if (filterItem.textContent.toLowerCase().includes(filterInput.value.toLowerCase())) {
        filterItem.removeAttribute('class');
      } else {
        filterItem.setAttribute('class', 'hidden_div');
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
  items.forEach((item) => {
    item.removeAttribute('class');
  });
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

function filtersDOMArray(filterName) {
  const articles = document.querySelectorAll('article');
  const newApplianceArray = [];
  articles.forEach((article) => {
    if (!(article.getAttribute('class').includes('hidden_div'))) {
      const ingredients = article.querySelectorAll('.card_ingredient_name');
      switch (filterName) {
        case 'appliance':
          if (!newApplianceArray.includes(article.querySelector('.card_content').getAttribute('data-appliance'))) {
            newApplianceArray.push(article.querySelector('.card_content').getAttribute('data-appliance'));
          }
          break;
        case 'ingredients':
          ingredients.forEach((ingredient) => {
            if (!newApplianceArray.includes(ingredient.textContent)) {
              newApplianceArray.push(ingredient.textContent);
            }
          });
          break;
        case 'ustensils':
          article.querySelector('.card_content').getAttribute('data-ustensils').split(',').forEach((ustensil) => {
            if (!newApplianceArray.includes(ustensil)) {
              newApplianceArray.push(ustensil);
            }
          });
          break;
        default:
          break;
      }
    }
  });
  return newApplianceArray;
}

function filterUpdate(filterName) {
  const filterIdList = `#${filterName}_list li`;
  const filterDOMList = document.querySelectorAll(filterIdList);
  filterDOMList.forEach((filterLi) => {
    if (!filtersDOMArray(filterName).includes(filterLi.textContent)) {
      filterLi.classList.add('hidden_div');
    } else {
      filterLi.classList.remove('hidden_div');
    }
  });
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
  filterUpdate,
};
