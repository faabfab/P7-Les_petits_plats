// =============================================================================
//  CARDS
// =============================================================================

/**
 * Fonction qui affiche le temps de la recette
 * @param {Number} time temps du le recette
 * @returns time DOM element
 */
function elementTime(time) {
  const divTime = document.createElement('div');
  divTime.setAttribute('class', 'card_time');
  divTime.textContent = `${time}min`;
  return divTime;
}

/**
 * Fonction qui affiche la vignette de la recette
 * @param {String} image image name
 * @param {String} name recipe name
 * @returns image DOM element
 */
function thumbElement(image, name) {
  const a = document.createElement('a');
  a.setAttribute('href', '#');
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  const imgPath = `/assets/img/recipes/${image}`;
  img.setAttribute('src', imgPath);
  img.setAttribute('alt', name);
  picture.appendChild(img);
  a.appendChild(picture);

  return a;
}

/**
 * Fonction qui affiche la liste des ingredients de la recette
 * @param {Array} ingredients tableau de ingredients
 * @returns ingredients DOM element
 */
function ingredientListElement(ingredients) {
  const divIngredients = document.createElement('div');
  divIngredients.setAttribute('class', 'card_ingredients');
  ingredients.forEach((ingredient) => {
    const pIngredients = document.createElement('p');
    pIngredients.setAttribute('class', 'card_ingredient');
    const spanName = document.createElement('span');
    spanName.setAttribute('class', 'card_ingredient_name');
    spanName.textContent = ingredient.ingredient;
    pIngredients.appendChild(spanName);
    const spanQuantity = document.createElement('span');
    spanQuantity.setAttribute('class', 'card_ingredient_quantity');
    if (ingredient.unit) {
      spanQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
    } else {
      spanQuantity.textContent = ingredient.quantity;
    }
    pIngredients.appendChild(spanQuantity);
    divIngredients.appendChild(pIngredients);
  });

  return divIngredients;
}

/**
 * Fonction qui affiche la partie texte de la recette
 * @param {String} name nom de la recette
 * @param {String} description description de la recette
 * @param {Array} ingredients de la recette
 * @returns text content DOM element
 */
function textContentElement(name, description, ingredients, appliance, ustensils) {
  const div = document.createElement('div');
  div.setAttribute('class', 'card_content');
  // appliance
  div.setAttribute('data-appliance', appliance);
  // ustensils
  div.setAttribute('data-ustensils', [...ustensils]);
  // Name
  const h3 = document.createElement('h3');
  h3.textContent = name;
  div.appendChild(h3);
  // Description
  const h4 = document.createElement('h4');
  h4.textContent = 'RECETTE';
  div.appendChild(h4);
  const pDescription = document.createElement('p');
  pDescription.setAttribute('class', 'card_content_description');
  pDescription.textContent = description;
  div.appendChild(pDescription);
  // Ingredients
  const h4Ingredients = document.createElement('h4');
  h4Ingredients.textContent = 'Ingrédients';
  div.appendChild(h4Ingredients);
  // Liste des ingredients
  div.appendChild(ingredientListElement(ingredients));

  return div;
}

/**
 * Fonction qui construit les cartes des recettes
 * @param {element} element celui qui accueille les cartes des recettes
 * @returns l'article de la recette
 */
function elementDatas(element) {
  // article
  const article = document.createElement('article');
  article.setAttribute('class', 'card');
  // Time
  article.appendChild(elementTime(element.time));
  // Thumb
  article.appendChild(thumbElement(element.image, element.name));
  // Text content
  article.appendChild(textContentElement(
    element.name,
    element.description,
    element.ingredients,
    element.appliance,
    element.ustensils,
  ));

  return article;
}

/**
 * Affiche les recettes dans le DOM
 * @param {Array} jsonConst tableau des recettes
 */
async function getCards(jsonConst) {
  const cards = document.querySelector('#cards');
  jsonConst.forEach((element) => {
    cards.appendChild(elementDatas(element));
  });
}

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

// =============================================================================
// EXPORTS
// =============================================================================

export {
  getCards,
  ingredientsArray,
  applianceArray,
  ustensilsArray,
  getFilterElements,
};
