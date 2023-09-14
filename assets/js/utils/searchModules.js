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
  const cards = document.querySelector('#cards');
  const articles = cards.querySelectorAll('article');
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
  // FIXME: Faire un compteur pour le message d'erreur
}

// =============================================================================
// Filter search
// =============================================================================

export default DOMSearch;
