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


document.addEventListener('DOMContentLoaded', () => {
  // Add the 'animated' class to the curtain after a short delay
  setTimeout(() => {
    const curtain = document.querySelector('.curtain');
    curtain.classList.add('animated');
  }, 250); // Delay to ensure the curtain is visible before animation starts
});


document.addEventListener('DOMContentLoaded', () => {
  // Select the .xtra-layer element
  const container = document.querySelector('.rotating-container');
  const layer = document.querySelector('.xtra-layer');
  const textName = document.getElementById('frontpage-name');
  const textDesc = document.getElementById('frontpage-description');
  const frontButtons = document.getElementById('frontpage-buttons')

  // Ensure the layer exists before proceeding
  if (layer) {
    // Function to handle the transition end event
    const handleTransitionEnd = (event) => {
      // Check if the transition is for the 'transform' property
      if (event.propertyName === 'transform') {
        // Add the 'animated' class to the body to trigger opacity changes
        document.body.classList.add('animated');

        // Remove the event listener after it's triggered
        layer.removeEventListener('transitionend', handleTransitionEnd);
      }
    };

    // Attach the transitionend event listener to the layer
    layer.addEventListener('transitionend', handleTransitionEnd);

    // Start the animation by adding the 'animated' class to the layer
    setTimeout(() => {
      layer.classList.add('animated');

    }, 250); // Delay to ensure visibility before animation starts

    setTimeout(() => {
      if (container) {
        container.classList.add('animated');
        document.body.classList.add('color-change')
      }
      
    }, 500);

  
  // Add the 'visible' class after a delay to trigger the animation
    setTimeout(() => {
      if (textName){
        textName.classList.add('visible');
      }
      
    }, 1200); // Delay before animation starts

    setTimeout(() => {
      if (textDesc){
        textDesc.classList.add('visible');
      }

    }, 1700); // Delay before animation starts

    setTimeout(() => {
      if (frontButtons){
        frontButtons.classList.add('visible');
      }
    }, 1900); // Delay before animation starts
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const whySection = document.querySelector(".reason-container");
  const content = document.querySelector(".reason-container .reason-content");
  const curtain = document.querySelector(".curtain");

  if (!curtain) {
    console.error(".curtain element not found!");
    return;
  }

  // Scroll event listener for the .curtain element
  curtain.addEventListener("scroll", function () {


    // Get the bounding rectangle of the section relative to the viewport
    const sectionRect = whySection.getBoundingClientRect();
    const curtainRect = curtain.getBoundingClientRect();

    // Calculate the center of the curtain's visible area
    const curtainCenterY = curtainRect.height / 2;

    const sectionCenterY = sectionRect.top + sectionRect.height / 2;

    // Determine the section's center position relative to the curtain's center
    const distanceFromCurtainCenter = sectionCenterY - curtainCenterY;

    scrollPosition = curtain.scrollTop; // Update scroll position

  // Recalculate and apply the new dynamic top value
    const dynamicTop = curtainCenterY + scrollPosition - content.offsetHeight / 2;
    
    console.log(dynamicTop)

    console.log(curtainCenterY)
    let opacity = 0;
    let fixed = false;
    const currentStyles = content.style.cssText;
    
    if (distanceFromCurtainCenter < 0) {
      opacity = 1;
      fixed = true;
      content.style.cssText = `
        ${currentStyles};
        opacity: ${opacity};
        position: ${fixed ? 'absolute' : 'relative'};
        top: ${fixed ? `${dynamicTop}px` : 'auto'};
        transform: scale(${1});
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;  
        margin: 0 120px;
        text-align: center;`; 
        return;
    } else {
      scale = Math.max(0.5, 1 - distanceFromCurtainCenter / (curtainRect.height / 2));
      opacity = Math.max(
        0.2,
        1 - distanceFromCurtainCenter / (curtainRect.height / 2)
      );
    }

    // Apply styles to the content
    content.style.cssText = currentStyles + `; opacity: ${opacity}; position: ${fixed ? 'absolute' : 'relative'}; top: ${fixed ? `${dynamicTop}px` : 'auto'}; transform: scale(${scale});`;
    console.log(content.style.position)

  });

  // Click event listener to log current opacity and position
  document.addEventListener("click", function () {
    const currentOpacity = window.getComputedStyle(content).opacity;
    console.log("Current Opacity:", currentOpacity);

    const position = content.getBoundingClientRect();
    console.log("Content Position:", position);
  });
});



