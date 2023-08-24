document.getElementById('dropdown-list').addEventListener('click', function () {
  document
    .getElementsByClassName('dropdown-content')[0]
    .classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function (event) {
  const dropdownContent = document.querySelector('.dropdown-content');
  const dropdownLi = document.querySelector('.dropdown-li');

  // Check if the clicked element or its ancestor is the dropdown
  if (!dropdownLi.contains(event.target)) {
    dropdownContent.classList.remove('show');
  }
});

// search functionality

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      const searchQuery = searchInput.value;
      searchItems(searchQuery);
    }
  });

  function searchItems(query) {
    window.location.href =
      '/user/all_users/search?query=' + encodeURIComponent(query);
  }
});
