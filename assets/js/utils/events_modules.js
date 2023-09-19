/**
 * Fonction qui renvoi le nombre total de recettes à l'écran
 */
function recipesCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  totalSpan.textContent = articles.length;
  return articles.length;
}

function recipesDisplayCounter() {
  const articles = document.querySelectorAll('article');
  const totalSpan = document.querySelector('#total');
  let hiddenRecipes = 0;
  let displayRecipes = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const article of articles) {
    article.classList.forEach((className) => {
      if (className === 'hidden_div') {
        hiddenRecipes += 1;
      }
    });
  }
  displayRecipes = recipesCounter() - hiddenRecipes;
  console.log(displayRecipes);
  totalSpan.textContent = displayRecipes;
}

function tagElement(name, tagsArray) {
  const divItemSelected = document.createElement('div');
  divItemSelected.setAttribute('class', 'item_selected');
  const p = document.createElement('p');
  p.textContent = name;
  divItemSelected.append(p);
  const divItemClose = document.createElement('div');
  divItemClose.setAttribute('class', 'item_selected_close');
  divItemClose.innerHTML = '<svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15" stroke="black" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  tagsArray.push(name);
  divItemClose.addEventListener('click', () => {
    divItemClose.parentElement.remove();
    tagsArray.splice(tagsArray.indexOf(name), 1);
  });
  divItemSelected.appendChild(divItemClose);
  return divItemSelected;
}

function closeButtonSearchInput(input, closeButton) {
  const search = document.querySelector(input);
  const reset = document.querySelector(closeButton);
  reset.addEventListener('click', () => {
    reset.classList.add('hidden_div');
  });
  search.onkeyup = () => {
    if (search.value.length >= 3) {
      reset.classList.remove('hidden_div');
    } else {
      reset.classList.add('hidden_div');
    }
  };
}

function resetSearchBar() {
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.classList.remove('hidden_div');
    recipesCounter();
  });
}

export {
  recipesCounter,
  tagElement,
  closeButtonSearchInput,
  resetSearchBar,
  recipesDisplayCounter,
};