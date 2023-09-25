/* eslint-disable import/extensions */
// =============================================================================
// Imports
// =============================================================================
// eslint-disable-next-line import/no-cycle
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
  // eslint-disable-next-line no-restricted-syntax
  for (const ingredientName of ingredientsName) {
    const ingredient = ingredientName.textContent.toLowerCase();
    // console.log(ingredient);
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

/**
 * Fonction qui efface les articles ne contenant pas la valeur à tester
 * @param {String} value valeur à tester
 */
function DOMSearch(value) {
  const articles = getArticles();
  // BUG: eslint syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    // eslint-disable-next-line no-use-before-define
    tagsSearch();
    if (value.length >= 3) {
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
    } else {
      article.classList.remove('hidden_div');
    }
  }
}

// =============================================================================
// Filter search
// =============================================================================

/**
 * Fonction qui efface l'article s'il ne contient pas le tag dans ses appareils
 */
function searchInAppliance(tag, article) {
  const content = article.querySelector('.card_content');
  const appliance = content.getAttribute('data-appliance');
  if (tag !== appliance.toLowerCase()) {
    article.classList.add('hidden_div');
  }
}

/**
 * Fonction qui efface l'article s'il ne contient pas le tag dans ses ustensiles
 */
function searchInUstensils(tag, article) {
  const divContent = article.querySelector('.card_content');
  if (!divContent.getAttribute('data-ustensils').toLowerCase().includes(tag)) {
    article.classList.add('hidden_div');
  }
}

/**
 * Fonction qui dit si tag est dans la liste des ingrédients ou pas
 * @param {Array} ingredients liste des ingrédients
 * @param {String} tag valeur à tester
 * @returns boolean
 */
function isIngredient(ingredients, tag) {
  let ok = false;
  ingredients.forEach((ingredient) => {
    if (ingredient.textContent.toLowerCase() === tag.toLowerCase()) {
      ok = true;
    }
  });
  return ok;
}

/**
 * Fonction qui efface l'article s'il ne contient pas le tag dans la liste de ses ingrédients
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
  // eslint-disable-next-line no-param-reassign
  filterName = filterName.slice(0, filterName.length - 5);
  // eslint-disable-next-line no-param-reassign
  tag = tag.toLowerCase();
  const articles = getArticles();
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    switch (filterName) {
      case 'ingredients':
        searchInIngredients(tag, article);
        break;
      case 'appliance':
        searchInAppliance(tag, article);
        break;
      case 'ustensils':
        searchInUstensils(tag, article);
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
  // eslint-disable-next-line no-restricted-syntax
  for (const tagItem of tagsList()) {
    searchByTag(tagItem, `${whatFilter(tagItem)}_list`);
  }
}

/**
 * Fonction qui réactualise la recherche quand on supprime un tag
 */
function closeTagBtnDOMEvent() {
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.classList.remove('hidden_div');
    const input = document.querySelector('#search');
    DOMSearch(input.value);
    tagsSearch();
  });
}

export {
  DOMSearch,
  searchByTag,
  closeTagBtnDOMEvent,
  tagsSearch,
};