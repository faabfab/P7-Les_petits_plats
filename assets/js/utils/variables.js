// search_bar
const mainSearch = document.querySelector('#search');
const searchButton = document.querySelector('#search_button');
const btResetSearchBar = document.querySelector('#search_reset');
// articles
const cards = document.querySelector('#cards');
const articles = document.querySelectorAll('article');
const totalSpan = document.querySelector('#total');
// article
// article content
// filters
const filterResetButtons = document.querySelectorAll('.filter_btn_reset');

// filter
const filters = document.querySelectorAll('.filter');
const filterSearchButtons = document.querySelectorAll('.filter_btn_submit');
const filtersItems = document.querySelectorAll('.filter_list li');
// tags
const itemsSelected = document.querySelector('#items_selected');

// =============================================================================
// Export
// =============================================================================
export {
  searchButton,
  filters,
  filterSearchButtons,
  filtersItems,
  itemsSelected,
  mainSearch,
  btResetSearchBar,
  filterResetButtons,
  cards,
  articles,
  totalSpan,
};
