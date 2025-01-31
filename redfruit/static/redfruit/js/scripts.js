/*
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 
/*
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
*/

console.log("JavaScript is working!");


/* animation-delay: calc( (1s / var(--quantity)) * (var(--position) - 1)) !important;
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    // Select all `.item` elements inside a `.slider` that has reverse="true"
    const items = document.querySelectorAll('.slider[reverse="true"] .item');
    
    // Loop through each selected item and update animation-play-state
    items.forEach(item => {
      item.style.animationPlayState = 'running';
    });
  }, 1905); // Start animation after 2 seconds
}); */

/* window.addEventListener("DOMContentLoaded", function () {
  // Select all columns with the class "column-class"
  const columns = document.querySelectorAll(".column-class");

  // Loop through each column
  columns.forEach((column) => {
      const clone = column.cloneNode(true); // Clone the entire column
      const columnHeight = column.offsetHeight; // Get the height of the original column

      // Position the clone above the original column
      clone.style.position = "absolute"; // Ensure the clone is positioned absolutely
      clone.style.top = `-${2 * columnHeight}px`; // Move it above by its full height

      // Append the clone to the parent of the original column
      column.parentNode.appendChild(clone);
  });

  console.log(`Number of columns: ${columns.length}`); // Log the number of columns
}); */

