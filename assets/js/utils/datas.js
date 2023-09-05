function elementDatas(element) {
  const article = document.createElement('article');
  article.setAttribute('class', 'card');
  // FIXME: Insérer minutes
  const divTime = document.createElement('div');
  divTime.setAttribute('class', 'card_time');
  divTime.textContent = `${element.time}min`;
  article.appendChild(divTime);
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  const imgPath = `/assets/img/recipes/${element.image}`;
  img.setAttribute('src', imgPath);
  picture.appendChild(img);
  const div = document.createElement('div');
  div.setAttribute('class', 'card_content');
  const h3 = document.createElement('h3');
  h3.textContent = element.name;
  div.appendChild(h3);
  const h4 = document.createElement('h4');
  h4.textContent = 'RECETTE';
  div.appendChild(h4);
  const pDescription = document.createElement('p');
  pDescription.setAttribute('class', 'card_content_description');
  pDescription.textContent = element.description;
  div.appendChild(pDescription);
  const h4Ingredients = document.createElement('h4');
  h4Ingredients.textContent = 'Ingrédients';
  div.appendChild(h4Ingredients);
  const divIngredients = document.createElement('div');
  divIngredients.setAttribute('class', 'card_ingredients');
  element.ingredients.forEach((ingredient) => {
    const pIgredients = document.createElement('p');
    pIgredients.setAttribute('class', 'card_ingredient');
    const spanName = document.createElement('span');
    spanName.setAttribute('class', 'card_ingredient_name');
    spanName.textContent = ingredient.ingredient;
    pIgredients.appendChild(spanName);
    const spanQuantity = document.createElement('span');
    spanQuantity.setAttribute('class', 'card_ingredient_quantity');
    if (ingredient.unit) {
      spanQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
    } else {
      spanQuantity.textContent = ingredient.quantity;
    }
    pIgredients.appendChild(spanQuantity);
    divIngredients.appendChild(pIgredients);
  });
  div.appendChild(divIngredients);

  article.appendChild(picture);
  article.appendChild(div);
  return article;
}

async function getCards(jsonConst) {
  const cards = document.querySelector('#cards');
  jsonConst.forEach((element) => {
    cards.appendChild(elementDatas(element));
  });
}

function ingredientsDatas(element) {
  // TODO: Faire un tableau sans redondance
  const ul = document.createElement('ul');
  element.ingredients.forEach((ingredients) => {
    const li = document.createElement('li');
    li.textContent = ingredients.ingredient;
    ul.appendChild(li)
  });
  return ul;
}

function applianceDatas(element) {
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.textContent = element.appliance;
  ul.appendChild(li);
  return ul;
}

function ustensilsDatas(element) {
  const ul = document.createElement('ul');
  element.ustensils.forEach((ustensil) => {
    const li = document.createElement('li');
    li.textContent = ustensil;
    ul.appendChild(li);
  });
  return ul;
}

function getFilterList(jsonConst, filter) {
  const idFilter = `#${filter}_list`
  const ingredientsList = document.querySelector(idFilter);
  jsonConst.forEach((element) => {
    switch (filter) {
      case 'ingredients':
        ingredientsDatas(element).childNodes.forEach((li) => {
          ingredientsList.appendChild(li);
        });
        break;
      case 'appliance':
        applianceDatas(element).childNodes.forEach((li) => {
          ingredientsList.appendChild(li);
        });
        break;
      case 'ustensils':
        ustensilsDatas(element).childNodes.forEach((li) => {
          ingredientsList.appendChild(li);
        });
        break;
      default:
        break;
    }
  });
  return ingredientsList;
}

export { getCards, getFilterList };
