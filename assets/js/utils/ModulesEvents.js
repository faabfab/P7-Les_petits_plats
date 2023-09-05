function recipesCounter() {
  const articles = document.querySelectorAll('article')
  const totalSpan = document.querySelector('#total');
  totalSpan.textContent = articles.length
}

function removeDuplicates(colors) {
  let unique = [];
  colors.forEach((i) => {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  console.log(unique)
  return Object.keys(unique);
}

// TODO: eneleve les redondance des filtres
function filterListCleaner(filter) {
  const idFilter = `#${filter}_list`;
  const filterList = document.querySelector(idFilter);
  const liFilterList = filterList.querySelectorAll('li')
  const uniqueArr = removeDuplicates(liFilterList)
  //filterList.innerHTML = '';
  //console.log(liFilterList);
}

export {recipesCounter, filterListCleaner}