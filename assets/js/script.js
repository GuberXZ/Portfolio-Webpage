'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}


// filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Photography pagination
document.addEventListener("DOMContentLoaded", function() {
  const itemsPerPage = 6;
  let currentPage = 1;
  const projectItems = document.querySelectorAll('.project-item');
  const pageInfo = document.querySelector('.page-info');
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  let activeFilter = 'all';  // Track the currently active filter

  const filterItems = document.querySelectorAll("[data-filter-item]");

  function getFilteredItems() {
    return Array.from(filterItems).filter(item => {
      return activeFilter === 'all' || item.dataset.category === activeFilter;
    });
  }

  function displayPage(page, filteredItems) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Hide all items first
    projectItems.forEach(item => item.style.display = 'none');

    // Show only the items for the current page
    filteredItems.slice(startIndex, endIndex).forEach(item => {
      item.style.display = 'block';
    });

    pageInfo.textContent = `Page ${page} of ${Math.ceil(filteredItems.length / itemsPerPage)}`;
    prevButton.disabled = (page === 1);
    nextButton.disabled = (page === Math.ceil(filteredItems.length / itemsPerPage));
  }

  function updatePagination() {
    const filteredItems = getFilteredItems();
    displayPage(currentPage, filteredItems);
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextButton.addEventListener('click', () => {
    const filteredItems = getFilteredItems();
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      currentPage++;
      updatePagination();
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.textContent.trim().toLowerCase();
      currentPage = 1; // Reset to the first page when filter changes
      updatePagination();
    });
  });

  // Initialize with the default filter
  updatePagination();
});

