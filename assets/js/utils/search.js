// =============================================================================
// Imports
// =============================================================================
import { tagsList, whatFilter } from '../components/tags.js';

/**
 * Fonction qui retourne l'élément qu DOM qui contient tous les articles
 * @returns L'élément que contient tous les articles
 */
function getArticles() {
  const cards = document.querySelector('#cards');
  const articles = cards.querySelectorAll('article');
  return articles;
}

/**
 * Fonction qui dit si un terme est présent das un élément choisi d'un article est présent ou pas
 * @param {String} value valeur a tester
 * @param {Element} DOMElement l'élément qui contient ce qui doit être tester
 * @param {Element} article l'élément global
 * @returns boolean
 */
function isInElementT(value, DOMElement, article) {
  const element = article.querySelector(DOMElement);
  const elementText = element.textContent.toLowerCase();
  if (elementText.includes(value)) {
    return true;
  }
  return false;
}

/**
 * Fonction qui dit si une string est présente ou pas dans la liste des ingrédients de l'article
 * @param {String} value chaîne à tester
 * @param {Element} article article où il faut tester
 * @returns boolean
 */
function isInIngredients(value, article) {
  const ingredientsName = article.querySelectorAll('.card_ingredient_name');
  for (const ingredientName of ingredientsName) {
    const ingredient = ingredientName.textContent.toLowerCase();
    if (ingredient.includes(value)) {
      return true;
    }
  }
  return false;
}

/**
 * Fonction qui dit si une string est présente ou pas dans un des data-attributes de l'article
 * @param {String} value chaîne à tester
 * @param {String} dataAttribute nom du data-attribute
 * @param {Element} article article où il faut tester
 * @returns Boolean
 */
function isInDataAttribute(value, dataAttribute, article) {
  const textContent = article.querySelector('.card_content');
  const applianceName = textContent.getAttribute(dataAttribute).toLowerCase();
  if (applianceName.includes(value)) {
    return true;
  }
  return false;
}

// =============================================================================
// Filter search
// =============================================================================

/**
 * fonction qui efface l'article si le tag n'est pas dans les appareils de l'article
 * @param {Element} tag de la liste des tags
 * @param {Element} article de la page
 */
function searchInAppliance(tag, article) {
  const content = article.querySelector('.card_content');
  const appliance = content.getAttribute('data-appliance');
  if (tag !== appliance.toLowerCase()) {
    article.classList.add('hidden_div');
  }
}

/**
 * fonction qui efface l'article si le tag n'est pas dans les ustensiles de l'article
 * @param {Element} tag de la liste des tags
 * @param {Element} article de la page
 */
function searchInUstensils(tag, article) {
  const divContent = article.querySelector('.card_content');
  if (!divContent.getAttribute('data-ustensils').toLowerCase().includes(tag.toLowerCase())) {
    article.classList.add('hidden_div');
  }
}

/**
 * fonction qui renvoi si le tag est dans les ingrédients de l'article
 * @param {Element} tag de la liste des tags
 * @param {Element} article de la page
 * @returns boolean
 */
function isIngredient(ingredients, tag) {
  let ok = false;
  for (const ingredient of ingredients) {
    if (ingredient.textContent.toLowerCase() === tag.toLowerCase()) {
      ok = true;
    }
  }
  return ok;
}

/**
 * fonction qui efface l'article si le tag n'est pas dans les ingrédients de l'article
 * @param {Element} tag de la liste des tags
 * @param {Element} article de la page
 */
function searchInIngredients(tag, article) {
  const ingredients = article.querySelectorAll('.card_ingredient_name');
  if (!isIngredient(ingredients, tag)) {
    article.classList.add('hidden_div');
  }
}

/**
 * Fonction qui efface les articles qui ne contiennent pas tag dans leur filtre correspondant
 * @param {String} tag tag a tester
 * @param {String} filterName Nom du filter
 */
function searchByTag(tag, filterName) {
  const articles = getArticles();
  for (const article of articles) {
    switch (filterName.slice(0, filterName.length - 5)) {
      case 'ingredients':
        searchInIngredients(tag.toLowerCase(), article);
        break;
      case 'appliance':
        searchInAppliance(tag.toLowerCase(), article);
        break;
      case 'ustensils':
        searchInUstensils(tag.toLowerCase(), article);
        break;
      default:
        break;
    }
  }
}

/**
 * Fonction qui efface les articles ne contenant pas les tags sélectionnés
 */
function tagsSearch() {
  for (const tagItem of tagsList()) {
    searchByTag(tagItem, `${whatFilter(tagItem)}_list`);
  }
}

/**
 * Fonction qui efface les articles ne contenant pas la valeur à tester
 * @param {String} value valeur à tester
 */
function DOMSearch(value) {
  const articles = getArticles();
  if (value.length < 3) {
    for (const article of articles) {
      article.classList.remove('hidden_div');
    }
    tagsSearch();
    return;
  }
  console.time(`search bar : ${value}`);
  for (const article of articles) {
    if (!isInElementT(value, 'h3', article)
        && !isInElementT(value, '.card_content_description', article)
        && !isInIngredients(value, article)
        && !isInDataAttribute(value, 'data-appliance', article)
        && !isInDataAttribute(value, 'data-ustensils', article)
    ) {
      article.classList.add('hidden_div');
    } else {
      article.classList.remove('hidden_div');
    }
    tagsSearch();
  }
  console.timeEnd(`search bar : ${value}`);
}

/**
 * Fonction qui réactualise la recherche quand on supprime un tag
 */
function closeTagBtnDOMEvent() {
  const articles = document.querySelectorAll('article');
  for (const article of articles) {
    article.classList.remove('hidden_div');
    const input = document.querySelector('#search');
    DOMSearch(input.value);
    tagsSearch();
  }
}

export {
  DOMSearch,
  searchByTag,
  closeTagBtnDOMEvent,
  tagsSearch,
};
