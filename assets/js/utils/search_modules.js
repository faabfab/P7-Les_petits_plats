function getCards() {
  const cards = document.querySelector('#cards');
  const articles = cards.querySelectorAll('article');
  return articles;
}

function isInElementT(value, DOMElement, article) {
  const element = article.querySelector(DOMElement);
  const elementText = element.textContent.toLowerCase();
  if (elementText.includes(value)) {
    return true;
  }
  return false;
}

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

function isInDataAttribute(value, dataAttribute, article) {
  const textContent = article.querySelector('.card_content');
  const applianceName = textContent.getAttribute(dataAttribute).toLowerCase();
  if (applianceName.includes(value)) {
    return true;
  }
  return false;
}

function DOMSearch(value) {
  const articles = getCards();
  // BUG: eslint syntax
  // TODO: Faire recherche si tags
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    // eslint-disable-next-line no-restricted-syntax, no-use-before-define
    tagsSearch();
    if (value.length >= 3) {
      if (!isInElementT(value, 'h3', article)) {
        if (!isInElementT(value, '.card_content_description', article)) {
          if (!isInIngredients(value, article)) {
            if (!isInDataAttribute(value, 'data-appliance', article)) {
              if (!isInDataAttribute(value, 'data-ustensils', article)) {
                article.classList.add('hidden_div');
              } else {
                article.classList.remove('hidden_div');
              }
            } else {
              article.classList.remove('hidden_div');
            }
          } else {
            article.classList.remove('hidden_div');
          }
        } else {
          article.classList.remove('hidden_div');
        }
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

function searchInAppliance(tag, article) {
  const content = article.querySelector('.card_content');
  const appliance = content.getAttribute('data-appliance');
  if (tag !== appliance.toLowerCase()) {
    article.classList.add('hidden_div');
  }
}

function searchInUstensils(tag, article) {
  const divContent = article.querySelector('.card_content');
  if (!divContent.getAttribute('data-ustensils').toLowerCase().includes(tag)) {
    article.classList.add('hidden_div');
  }
}

function isIngredient(ingredients, tag) {
  let ok = false;
  ingredients.forEach((ingredient) => {
    if (ingredient.textContent.toLowerCase() === tag.toLowerCase()) {
      ok = true;
    }
  });
  return ok;
}

function searchInIngredients(tag, article) {
  const ingredients = article.querySelectorAll('.card_ingredient_name');
  if (!isIngredient(ingredients, tag)) {
    article.classList.add('hidden_div');
  }
}

function searchByTag(tag, filterName) {
  // eslint-disable-next-line no-param-reassign
  filterName = filterName.slice(0, filterName.length - 5);
  // eslint-disable-next-line no-param-reassign
  tag = tag.toLowerCase();
  const articles = getCards();
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

function filterArray(filterName) {
  const arrayTags = [];
  const idFilter = `#${filterName}_list`;
  const filterElements = document.querySelector(idFilter);
  filterElements.childNodes.forEach((filterElement) => {
    arrayTags.push(filterElement.textContent);
  });
  return arrayTags;
}

function tagInFilter(name, filterName) {
  if (filterArray(filterName).includes(name)) {
    return filterName;
  }
  return false;
}

function whatFilter(name) {
  let filterName = '';
  if (tagInFilter(name, 'ingredients')) {
    filterName = tagInFilter(name, 'ingredients');
  }
  if (tagInFilter(name, 'appliance')) {
    filterName = tagInFilter(name, 'appliance');
  }
  if (tagInFilter(name, 'ustensils')) {
    filterName = tagInFilter(name, 'ustensils');
  }
  return filterName;
}

function tagsList() {
  const tagsArray = [];
  const tagsDiv = document.querySelectorAll('.item_selected');
  tagsDiv.forEach((tag) => {
    const p = tag.querySelector('p');
    tagsArray.push(p.textContent);
  });
  return tagsArray;
}

function tagsSearch() {
  // eslint-disable-next-line no-restricted-syntax
  for (const tagItem of tagsList()) {
    searchByTag(tagItem, `${whatFilter(tagItem)}_list`);
  }
}

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
