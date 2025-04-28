/*
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const curtain = document.querySelector('.out-curtain');
    curtain.classList.remove('transition-out');
  }
});



document.addEventListener('DOMContentLoaded', () => {
  // Add the 'animated' class to the curtain after a short delay
  setTimeout(() => {
    const curtain = document.querySelector('.curtain');
    curtain.classList.add('animated');
  }, 250); // Delay to ensure the curtain is visible before animation starts




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




    //Welcome Section
    const welcome_text = document.querySelector('.welcome-text');
    const welcome_description = document.querySelector('.welcome-description');
    setTimeout(() => {
        welcome_text.classList.add('animate');
        welcome_description.classList.add('animate');
    }, 1); // 2-second delay



  const whySection = document.querySelector(".reason-container");
  const content = document.querySelector(".reason-container .reason-content");
  const curtain = document.querySelector(".curtain");

  if (!curtain) {
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

    
    let opacity = 0;
    let fixed = false;
    const currentStyles = content.style.cssText;

    if (sectionRect.bottom < -215) {
      content.style.visibility = 'hidden'; // Directly set the visibility property
      return; // Exit the function or block if needed
    }
    
    if (distanceFromCurtainCenter < 0) {
      opacity = 1;
      fixed = true;
      content.style.cssText = `
        ${currentStyles};
        opacity: ${opacity};
        position: ${fixed ? 'absolute' : 'relative'};
        top: ${fixed ? `${dynamicTop}px` : 'auto'};
        visibility: visible;
        transform: scale(${1});
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        text-align: center;`; 
        return;
    } else {
      scale = Math.max(0.5, 1 - distanceFromCurtainCenter / (curtainRect.height / 2));
      opacity = Math.max(
        0,
        1 - distanceFromCurtainCenter / (curtainRect.height / 2)
      );
      content.style.cssText = currentStyles + `; opacity: ${opacity}; position: ${fixed ? 'absolute' : 'relative'}; top: ${fixed ? `${dynamicTop}px` : 'auto'}; transform: scale(${scale});`;
    }
    // Apply styles to the content
    




  });
  //Technologies and Frameworks Section
  const tech_section = document.querySelector(".technologies-used-text-container");
  const text = document.querySelector('.tech-text');

  // Exit if any required element doesn't exist
  if (!text || !tech_section) {
    console.warn("Required elements not found.");
    return;
  }

  // Define the threshold for center alignment (adjust as needed)
  const centerThreshold = 200;

  // Scroll event listener for the .curtain element
  curtain.addEventListener("scroll", function () {
    // Get the bounding rectangle of the section relative to the viewport
    const sectionRect = tech_section.getBoundingClientRect();
    const curtainRect = curtain.getBoundingClientRect();

    // Calculate the center of the curtain's visible area (viewport center)
    const curtainCenterY = curtainRect.height / 2;

    // Calculate the vertical center of the technologies-container
    const sectionCenterY = sectionRect.top + sectionRect.height / 2;

    // Determine the distance between the section's center and the curtain's center
    const distanceFromCurtainCenter = sectionCenterY - curtainCenterY;

    // Update scroll position
    const scrollPosition = curtain.scrollTop;
    const dynamicTop = curtainCenterY - text.offsetHeight / 2 + scrollPosition;

    // Check if the technologies-container is centered in the viewport
    if (Math.abs(distanceFromCurtainCenter) <= centerThreshold) {
      // Add the 'active' class
      text.classList.add('active');


      text.style.position = "absolute";
      text.style.top = `${dynamicTop}px`;

    } else {
      // Remove the 'active' class
      text.classList.remove('active');
      // Reset the position to avoid lingering styles
      text.style.top = `${dynamicTop}px`;
    }
  });


  //Cards Section
  const tech_cards_section = document.querySelector(".technologies-container");
  const technologyCards = document.getElementById('technology-cards');

  // Exit if any required element doesn't exist
  if (!tech_cards_section || !technologyCards) {
    console.warn("Required elements not found.");
    return;
  }

  // Define the threshold for center alignment (adjust as needed)
  const CardsCenterThreshold = 200;

  // Scroll event listener for the .curtain element
  curtain.addEventListener("scroll", function () {
    // Get the bounding rectangle of the section relative to the viewport
    const sectionRect = tech_cards_section.getBoundingClientRect();
    const curtainRect = curtain.getBoundingClientRect();

    // Calculate the center of the curtain's visible area (viewport center)
    const curtainCenterY = curtainRect.height / 2;

    // Calculate the vertical center of the technologies-container
    const dataSectionCenterY = sectionRect.top + sectionRect.height / 2;

    // Determine the distance between the section's center and the curtain's center
    const distanceFromCurtainCenter = dataSectionCenterY - curtainCenterY;

    // Update scroll position
    const scrollPosition = curtain.scrollTop;
    const dynamicTop = curtainCenterY - technologyCards.offsetHeight / 2 + scrollPosition;
    // Check if the technologies-container is centered in the viewport
    if (Math.abs(distanceFromCurtainCenter) <= CardsCenterThreshold) {
      // Add the 'active' class
      technologyCards.classList.add('active');

      // Dynamically position the technologyCards at the center of the curtain

      technologyCards.style.position = "absolute";
      technologyCards.style.top = `${dynamicTop}px`;

    } else {
      // Remove the 'active' class
      technologyCards.classList.remove('active');
      // Reset the position to avoid lingering styles
      technologyCards.style.top = `${dynamicTop}px`;
    }
  });






// Dataset Section
const recommendation_section = document.querySelector(".recommendations-info");

const spaces = document.getElementById("gradient-space");
const data_title = document.getElementById("dataset_title");
const data_slider = document.querySelector(".slider");

let fixed_title = false;


// Exit if required elements are missing
if (!spaces || !data_title || !data_slider || !curtain) {
  console.warn("Required elements not found.");
} else {
  function updateTitlePosition() {
    const sectionRect = spaces.getBoundingClientRect();
    const curtainRect = curtain.getBoundingClientRect();
    const data_sliderTop = data_slider.getBoundingClientRect().top;
    let data_titleBottom = data_title.getBoundingClientRect().bottom;

    const curtainCenterY = curtainRect.height / 2;
    const sectionCenterY = sectionRect.top + sectionRect.height / 2;
    const distanceFromCurtainCenter = sectionCenterY - curtainCenterY;
    const scrollPosition = curtain.scrollTop;

    let dynamicTopTitle = curtainCenterY - data_title.offsetHeight / 2 + scrollPosition;

    // Prevent extreme positioning by clamping values
    dynamicTopTitle = Math.max(dynamicTopTitle, 0);
    data_titleBottom = Math.min(data_titleBottom, document.documentElement.clientHeight);

    data_title.style.visibility = "visible";

    const recommendation_bottom = recommendation_section.getBoundingClientRect().bottom;


    if (!fixed_title) {

        if (data_sliderTop < 0 || distanceFromCurtainCenter > 240) {
          //data_title.style.top = sectionRect.top;
          data_title.style.visibility = "hidden";
        }

        if (data_sliderTop - data_titleBottom > 40) {

            data_title.style.position = "absolute";
            data_title.style.top = `${dynamicTopTitle}px`;
        } else {
            fixed_title = true;
        }

    }
  }




  // Scroll event listener
  curtain.addEventListener("scroll", () => requestAnimationFrame(updateTitlePosition));

  // Resize event listener
  window.addEventListener("resize", () => {

    requestAnimationFrame(() => {
      fixed_title = false;
      updateTitlePosition();

      // Reset data_title position if needed
      data_title.style.position = "absolute";
      data_title.style.bottom = data_sliderTop - 40; // Let browser recalculate its position
    });

  });

  // Run the function initially to set correct positions
  updateTitlePosition();
}






  const walkthrough = {
    index: 0,

    nextScreen() {
      if (this.index < this.indexMax()) {
        this.index++;
        this.updateScreen();
      }
    },

    prevScreen() {
      if (this.index > 0) {
        this.index--;
        this.updateScreen();
      }
    },

    updateScreen() {
      this.reset();
      this.goTo(this.index);
      this.setBtns();
    },

    setBtns() {
      const prevBtn = document.querySelector('.prev-screen');
      const nextBtn = document.querySelector('.next-screen');

      if (this.index === 0) {
        prevBtn.disabled = true;
        nextBtn.disabled = false;
      } else if (this.index === this.indexMax()) {
        prevBtn.disabled = false;
        nextBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
      }
    },

    goTo(index) {
      document.querySelectorAll('.screen')[index].classList.add('active');
      document.querySelectorAll('.dot')[index].classList.add('active');
    },

    reset() {
      document.querySelectorAll('.screen, .dot').forEach(el => el.classList.remove('active'));
    },

    indexMax() {
      return document.querySelectorAll('.screen').length - 1;
    },
  };

  // Event listeners for arrow buttons
  document.querySelector('.next-screen').addEventListener('click', () => walkthrough.nextScreen());
  document.querySelector('.prev-screen').addEventListener('click', () => walkthrough.prevScreen());

  // Initialize the walkthrough
  walkthrough.updateScreen();

  // Use keyboard navigation with e.key instead of e.which
    switch (e.key) {
      case 'ArrowLeft': // Left arrow key
        walkthrough.prevScreen();
        break;
      case 'ArrowRight': // Right arrow key
        walkthrough.nextScreen();
        break;
      default:
        return;
    }
    e.preventDefault(); // Prevent default behavior (optional)





});


document.addEventListener("DOMContentLoaded", function () {
    const overview_text = document.querySelector('.overview-container');
    setTimeout(() => {
        overview_text.classList.add('show');
    }, 2000); // 2-second delay

});


document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  const out_curtain = document.querySelector('.out-curtain');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.href;

      // Ensure transition class is applied on next frame
      requestAnimationFrame(() => {
        out_curtain.classList.add('transition-out');

        setTimeout(() => {
          window.location.href = href;
        }, 1000); // Match your CSS transition duration (in ms)
      });
    });
  });


  contact_btn = document.getElementById('nav-button');
  modal_fade = document.querySelector('.background-fade');
  close_modal_btn = document.getElementById('close-contact-modal');
  modal_container = document.querySelector('.contact-container');
  form = document.getElementById('contactForm');
  submit_btn = document.getElementById('submitButton');

  contact_btn.addEventListener('click', function (){
    modal_fade.classList.add('show');
    modal_fade.classList.remove('hide');
    modal_container.classList.add('show');
    modal_container.classList.remove('hide');
  });

  close_modal_btn.addEventListener('click', function (){
    modal_fade.classList.remove('show');
    modal_fade.classList.add('hide');
    modal_container.classList.remove('show');
    modal_container.classList.add('hide');
    form.reset();

  })

    form.addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault(); // Prevent submission if invalid
      this.reportValidity(); // Show built-in validation popups
        }
    });

    form.addEventListener("input", function () {
        if (form.checkValidity()) {
            //Send the Message
          }
    });


});
