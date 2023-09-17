
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
  let count = 0;
  const articles = getCards();
  // BUG: eslint syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    if (value.length >= 3) {
      // const h3 = article.querySelector('h3');
      // const name = h3.textContent.toLowerCase();
      // if (!name.includes(value)) {
      if (!isInElementT(value, 'h3', article)) {
        if (!isInElementT(value, '.card_content_description', article)) {
          if (!isInIngredients(value, article)) {
            if (!isInDataAttribute(value, 'data-appliance', article)) {
              if (!isInDataAttribute(value, 'data-ustensils', article)) {
                article.classList.add('hidden_div');
                count += 1;
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
  return count;
}

// =============================================================================
// Filter search
// =============================================================================
function searchInIngredients(tag, article) {
  const ingredients = article.querySelectorAll('.card_ingredient_name');
  // eslint-disable-next-line no-restricted-syntax
  for (const ingredient of ingredients) {
    if (!(ingredient.textContent.toLowerCase() === tag)) {
      console.log(`${tag} est dans les ingredient`);
      //article.classList.add('hidden_div');
    } else {
      console.log(`${tag} n'est pas dans les ingredient`);
    }
  }
}

function searchInAppliance(tag, article) {
  const content = article.querySelector('.card_content');
  const appliance = content.getAttribute('data-appliance');
  // si !tag et si visible
  //  alors invisible
  // sinon (tag) si invisible
  //  alors visible
  if (!(appliance.toLowerCase() === tag)) {
    article.classList.add('hidden_div');
  } else { article.classList.remove('hidden_div'); }
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
        //console.log(`rechercher ${tag} dans ingredients`);
        break;
      case 'appliance':
        //console.log(`rechercher ${tag} dans appliance`);
        searchInAppliance(tag, article);
        break;
      case 'ustensils':
        //console.log(`rechercher ${tag} dans ustensils`);
        break;
      default:
        break;
    }
  }
}

export { DOMSearch, searchByTag };
