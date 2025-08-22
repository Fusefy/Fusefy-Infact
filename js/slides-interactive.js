/**
 * Global interactive elements handler for all Fusefy slides
 * This file manages all click events, animations, and interactive elements
 * across all slides to ensure consistent behavior.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Slides interactive handler initialized');
  
  // Initialize all slide interactivity
  setupAllSlideInteractions();
  
  // Listen for Reveal.js events if available
  if (typeof Reveal !== 'undefined') {
    // Re-initialize when slides change
    Reveal.addEventListener('slidechanged', function(event) {
      console.log('Slide changed, reinitializing interactions');
      setupAllSlideInteractions();
      
      // Reset to first fragment on index slide
      if (event.currentSlide && event.currentSlide.classList.contains("index-slide")) {
        Reveal.navigateFragment(-1); // Reset to beginning
      }
    });
    
    // Handle fragment events
    Reveal.addEventListener('fragmentshown', function(event) {
      handleFragmentVisibility(event.fragment, true);
    });
    
    Reveal.addEventListener('fragmenthidden', function(event) {
      handleFragmentVisibility(event.fragment, false);
    });
  } else {
    // If Reveal.js isn't available yet, wait for it
    window.addEventListener('load', function() {
      if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('ready', function() {
          setupAllSlideInteractions();
        });
      }
    });
  }
});

function resetAnimation(el) {
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
}

//----------------------------------------- Function for slide 4 , the animation will work whenever the slide is shown
// Replay all hero, headings, and cards animations
function replayAnimations() {
  // Hero section
  document.querySelectorAll('.platform-hero .platform-heading, .platform-hero .platform-hyphen, .platform-hero .platform-subtext')
    .forEach(resetAnimation);

  // Section headings
  document.querySelectorAll('.cloud-platform-heading, .ai-platform-heading, .byo-platform-heading')
    .forEach(resetAnimation);

  // All cards
  document.querySelectorAll('.platform-card')
    .forEach(resetAnimation);
}


//------------------------------------------

// File: Fusefy-Demo/js/slides-interactive.js

// File: Fusefy-Demo/js/slides-interactive.js

// Wait for the Reveal.js framework to be fully initialized before running our script.
Reveal.addEventListener('ready', function() {

    // Select the component's main container within the current slide
    const container = document.querySelector('.slide-container');

    // If the component doesn't exist on the page, stop the script
    if (!container) {
        return;
    }

    // Prevents the script from running multiple times if the slide is re-initialized
    if (container.dataset.initialized) {
        return;
    }
    container.dataset.initialized = 'true';

    // --- 1. DATA for each step ---
    const stepsData = {
        1: {
            title: "1. Containerize the Code",
            description: "Package your application and its dependencies into a standardized, portable container.",
            points: [
                "Write a Dockerfile defining the environment.",
                "Define dependencies, runtime, and entry point.",
                "Build a lightweight, efficient Docker image."
            ],
            icon: "fa-solid fa-box-archive",
            theme: "theme-blue",
            pointIcon: "fa-solid fa-check"
        },
        2: {
            title: "2. Run & Test",
            description: "Ensure the containerized application works perfectly in a local development environment.",
            points: [
                "Use VS Code Live Server / Live Share for real-time testing.",
                "Make and test changes directly in the editor.",
                "Use mounted volumes to reflect code updates instantly."
            ],
            icon: "fa-solid fa-person-running",
            theme: "theme-teal",
            pointIcon: "fa-solid fa-check"
        },
        3: {
            title: "3. Edit & Verify",
            description: "Iteratively improve the code based on local testing and feedback.",
            points: [
                "Update code inside VS Code to fix bugs or add features.",
                "Saved changes sync with the live running instance.",
                "Retest the application until it works as expected."
            ],
            icon: "fa-solid fa-code",
            theme: "theme-purple",
            pointIcon: "fa-solid fa-check"
        },
        4: {
            title: "4. Platform-based Deployment",
            description: "Push the container image to a cloud registry and deploy it to a hosting service.",
            points: [
                "Push image to a registry (e.g., Docker Hub, AWS ECR, GCP GCR).",
                "Deploy using a service like AWS ECS, GCP Cloud Run, or Azure App Service.",
                "Configure networking, scaling, and environment variables."
            ],
            icon: "fa-solid fa-cloud-arrow-up",
            theme: "theme-orange",
            pointIcon: "fa-solid fa-check"
        },
        5: {
            title: "5. Automated Deployment Flow",
            description: "Establish a CI/CD pipeline to automate the entire build, test, and deploy process.",
            points: [
                "Commit changes to a Git repository to trigger the pipeline.",
                "CI/CD (e.g., GitHub Actions) automatically builds and pushes the image.",
                "The platform fetches the latest container and deploys it seamlessly."
            ],
            icon: "fa-solid fa-circle-check",
            theme: "theme-green",
            pointIcon: "fa-solid fa-check"
        }
    };

    // --- 2. DOM Elements ---
    const navList = document.getElementById('nav-list');
    const navItems = document.querySelectorAll('.nav-item');
    const workflowDetailsContainer = document.getElementById('workflow-details');

    if (!navList || navItems.length === 0 || !workflowDetailsContainer) {
        console.error("Workflow component elements not found. Script will not run.");
        return;
    }

    // --- 3. Function to update content ---
    function updateContent(step) {
        const data = stepsData[step];
        if (!data) return;
        const pointsHtml = data.points.map(point => `<li><div class="list-icon"><i class="${data.pointIcon}"></i></div><span>${point}</span></li>`).join('');
        const contentHtml = `<div class="content-header"><div class="content-icon"><i class="${data.icon}"></i></div><div class="content-title"><h3>${data.title}</h3><p>${data.description}</p></div></div><div class="content-details"><ul>${pointsHtml}</ul></div>`;
        workflowDetailsContainer.innerHTML = contentHtml;
        workflowDetailsContainer.className = 'workflow-content';
        workflowDetailsContainer.classList.add(data.theme);
    }

    // --- 4. Function to handle nav clicks ---
    function handleNavClick(e) {
        const clickedItem = e.target.closest('.nav-item');
        if (!clickedItem) return;
        const step = clickedItem.dataset.step;
        navItems.forEach(item => {
            item.classList.remove('active');
            Object.values(stepsData).forEach(data => item.classList.remove(data.theme));
        });
        const data = stepsData[step];
        if (data) {
            clickedItem.classList.add('active', data.theme);
        }
        updateContent(step);
    }

    // --- 5. Initial setup ---
    function initialize() {
        const firstNavItem = navItems[0];
        const initialStep = firstNavItem.dataset.step;
        const initialData = stepsData[initialStep];
        if (initialData) {
            firstNavItem.classList.add('active', initialData.theme);
            updateContent(initialStep);
        }
        navList.addEventListener('click', handleNavClick);
    }

    initialize();
});
//--------------------------------------------
// Reveal.js event for slide change
document.addEventListener('DOMContentLoaded', function () {
  if (window.Reveal) {
    Reveal.addEventListener('slidechanged', function (event) {
      if (event.currentSlide && event.currentSlide.classList.contains('index-slide')) {
        replayAnimations();
      }
    });
  }
});

// -------------------Function for slide 6- BATTLE CARD ----------------------
function resetAnimation(element) {
  element.style.animation = 'none';
  // Force reflow
  void element.offsetWidth;
  element.style.animation = '';
}

// Replay all main block and table row animations
function replayAnimations() {
  // Main blocks
  ['.features-section', '.compare-section', '.comparison-table-container'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) resetAnimation(el);
  });
  // Table rows
  document.querySelectorAll('.comparison-table tbody tr').forEach(row => resetAnimation(row));
}

// Reveal.js event for slide change
document.addEventListener('DOMContentLoaded', function () {
  if (window.Reveal) {
    Reveal.addEventListener('slidechanged', function (event) {
      if (event.currentSlide && event.currentSlide.classList.contains('index-slide')) {
        replayAnimations();
      }
    });
  }
});

//--------------------------- Function for tab navigation slide 3 -Vertical and Categories we serve -----------------------------------
function showTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
    }
/**
 * Master function to set up all interactive elements
 */
function setupAllSlideInteractions() {
  // Setup clickable images for zoom
  setupZoomableImages();
  
  // Setup navigation buttons within slides
  setupNavigationButtons();
  
  // Setup AI adoption slide specific functionality
  setupAIAdoptionSlide();
  
  // Setup progress rings and multipliers in business impact slide
  setupBusinessImpactAnimations();
  
  // Add pulse effect to logos
  setupLogoPulseEffects();
  
  // Setup any other interactive elements
  setupMiscInteractions();
}

/**
 * Handle clickable images that show a zoomed version
 */
function setupZoomableImages() {
  // Remove any existing event listeners
  document.querySelectorAll('.clickable-image').forEach(img => {
    img.removeAttribute('onclick');
  });
  
  // Add event delegation for clickable images
  document.addEventListener('click', function(event) {
    // Check if the clicked element has the clickable-image class
    if (event.target.classList.contains('clickable-image')) {
      event.preventDefault();
      event.stopPropagation();
      
      const imgSrc = event.target.getAttribute('data-src') || event.target.src;
      showZoom(imgSrc);
      return false;
    }
    
    // Handle zoom overlay close button
    if (event.target.closest('.close-zoom')) {
      event.preventDefault();
      event.stopPropagation();
      closeZoom();
      return false;
    }
  }, true);

  // Keyboard event for closing zoom overlay
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const zoomOverlay = document.querySelector('.zoom-overlay.active');
      if (zoomOverlay) {
        closeZoom();
        event.preventDefault();
      }
    }
  });
}

/**
 * Show zoomed image in overlay
 */
function showZoom(imgSrc) {
  let overlay = document.getElementById('zoomOverlay');
  
  // If the overlay doesn't exist, create it
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'zoomOverlay';
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = `
      <div class="close-zoom">×</div>
      <img class="zoom-image" id="zoomedImage" src="" alt="Zoomed Image" />
    `;
    document.body.appendChild(overlay);
  }
  
  const zoomedImg = document.getElementById('zoomedImage');
  zoomedImg.src = imgSrc;
  overlay.classList.add('active');
  
  if (typeof Reveal !== 'undefined') {
    Reveal.configure({ keyboard: false });
  }
}

/**
 * Close zoomed image overlay
 */
function closeZoom() {
  const overlay = document.getElementById('zoomOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  if (typeof Reveal !== 'undefined') {
    Reveal.configure({ keyboard: true });
  }
}

/**
 * Setup AI adoption slide specific functionality
 */
function setupAIAdoptionSlide() {
  const slide = document.querySelector('.ai-adoption-slide');
  if (!slide) return;

  // Page switching logic
  const page1 = slide.querySelector('#content-set-1');
  const page2 = slide.querySelector('#content-set-2');
  const nextButton = slide.querySelector('#next-button');
  const backButton = slide.querySelector('#back-button');

  // Remove any existing event listeners to prevent duplicates
  if (nextButton) {
    nextButton.removeAttribute('onclick');
    // Clone node to remove all event listeners
    const newNextButton = nextButton.cloneNode(true);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);
    
    newNextButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (page1 && page2) {
        page1.style.display = 'none';
        page2.style.display = 'flex';
        animateElementsOnShow(page2);
      }
      return false;
    });
  }

  if (backButton) {
    backButton.removeAttribute('onclick');
    // Clone node to remove all event listeners
    const newBackButton = backButton.cloneNode(true);
    backButton.parentNode.replaceChild(newBackButton, backButton);
    
    newBackButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (page1 && page2) {
        page2.style.display = 'none';
        page1.style.display = 'flex';
        resetAnimationsOnHide(page2);
      }
      return false;
    });
  }

  // Setup explanation popups
  setupExplanationPopups(slide);
}

/**
 * Helper function to animate elements when shown
 */
function animateElementsOnShow(container) {
  const elements = container.querySelectorAll('.animate-on-show');
  elements.forEach((el, index) => {
    el.classList.remove('start-animation');
    setTimeout(() => {
      el.style.animationDelay = `${index * 150}ms`;
      el.classList.add('start-animation');
    }, 10);
  });
}

/**
 * Helper function to reset animations when hidden
 */
function resetAnimationsOnHide(container) {
  container.querySelectorAll('.animate-on-show').forEach(el => {
    el.classList.remove('start-animation');
    el.style.animationDelay = '';
  });
}

/**
 * Setup explanation popups for AI adoption slide
 */
function setupExplanationPopups(slide) {
  const cardTitles = slide.querySelectorAll('.future-card-title');
  
  cardTitles.forEach(title => {
    const card = title.closest('.future-card');
    const popup = card.querySelector('.explanation-popup');
    
    if (!popup) return;
    
    // Remove any existing event listeners
    const newTitle = title.cloneNode(true);
    title.parentNode.replaceChild(newTitle, title);
    
    // Hover behavior
    newTitle.addEventListener('mouseenter', () => {
      // Hide any other active popups
      slide.querySelectorAll('.explanation-popup.active').forEach(p => {
        if (p !== popup) p.classList.remove('active');
      });
      popup.classList.add('active');
    });
    
    newTitle.addEventListener('mouseleave', () => {
      if (!popup.matches(':hover')) {
        popup.classList.remove('active');
      }
    });
    
    // Keep popup open when hovering over it
    popup.addEventListener('mouseenter', () => {
      popup.classList.add('active');
    });
    
    popup.addEventListener('mouseleave', () => {
      popup.classList.remove('active');
    });
    
    // Click behavior for mobile/touch devices
    newTitle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle this popup and hide others
      const isCurrentlyActive = popup.classList.contains('active');
      slide.querySelectorAll('.explanation-popup.active').forEach(p => {
        p.classList.remove('active');
      });
      
      if (!isCurrentlyActive) {
        popup.classList.add('active');
      }
      
      return false;
    });
  });
  
  // Close popups when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.future-card')) {
      slide.querySelectorAll('.explanation-popup.active').forEach(popup => {
        popup.classList.remove('active');
      });
    }
  });
}

/**
 * Setup navigation buttons within slides
 */
function setupNavigationButtons() {
  // Remove any existing event handlers (excluding AI adoption slide which is handled separately)
  document.querySelectorAll('#next-button, #back-button').forEach(btn => {
    // Skip if this button is in the AI adoption slide (handled separately)
    if (btn.closest('.ai-adoption-slide')) return;
    btn.removeAttribute('onclick');
  });
  
  // Use event delegation for navigation buttons (excluding AI adoption slide)
  document.addEventListener('click', function(event) {
    // Skip if we're in the AI adoption slide (handled separately)
    if (event.target.closest('.ai-adoption-slide')) return;
    
    // Next button in other slides
    if (event.target.closest('#next-button')) {
      event.preventDefault();
      event.stopPropagation();
      
      // Handle other slide navigation here if needed
      return false;
    }
    
    // Back button in other slides
    if (event.target.closest('#back-button')) {
      event.preventDefault();
      event.stopPropagation();
      
      // Handle other slide navigation here if needed
      return false;
    }
  }, true);
  
  // Add keyboard navigation support (excluding AI adoption slide)
  document.addEventListener('keydown', function(event) {
    // Skip if we're in the AI adoption slide
    const currentSlide = typeof Reveal !== 'undefined' ? Reveal.getCurrentSlide() : null;
    if (currentSlide && currentSlide.classList.contains('ai-adoption-slide')) return;
    
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      // Handle keyboard navigation for other slides if needed
    }
  });
}

/**
 * Handle business impact slide animations (progress rings, multipliers)
 */
function setupBusinessImpactAnimations() {
  const businessImpactSlide = document.querySelector('.business-impact-slide');
  if (!businessImpactSlide) return;
  
  // Ensure the slide header is always visible
  const slideHeader = businessImpactSlide.querySelector('.slide-header');
  if (slideHeader) {
    slideHeader.style.visibility = 'visible';
    slideHeader.style.opacity = '1';
  }
  
  // Calculate offset for progress rings
  const circles = businessImpactSlide.querySelectorAll('.progress-ring-circle');
  circles.forEach(circle => {
    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    
    // Set the stroke-dasharray to the circumference
    const valueCircle = circle.nextElementSibling;
    if (valueCircle && valueCircle.classList.contains('progress-ring-circle-value')) {
      valueCircle.style.strokeDasharray = `${circumference}`;
      valueCircle.setAttribute('data-circumference', circumference);
      
      // Initially set to full circumference (0% progress)
      valueCircle.style.strokeDashoffset = circumference;
    }
  });
  
  // Initialize animations if this is not within Reveal.js
  if (typeof Reveal === 'undefined') {
    // Find all animation elements
    const ringCircles = businessImpactSlide.querySelectorAll('.progress-ring-circle-value');
    const animateCounts = businessImpactSlide.querySelectorAll('.animate-count');
    const multiplierProgress = businessImpactSlide.querySelectorAll('.multiplier-progress');
    const activeMarkers = businessImpactSlide.querySelectorAll('.multiplier-marker.active');
    const currentMarkers = businessImpactSlide.querySelectorAll('.multiplier-marker.current');
    const multiplierValues = businessImpactSlide.querySelectorAll('.multiplier-value');
    
    // Animate all elements
    ringCircles.forEach(circle => circle.classList.add('animate'));
    animateCounts.forEach(count => count.classList.add('animate'));
    multiplierProgress.forEach(progress => progress.classList.add('animate'));
    activeMarkers.forEach(marker => marker.classList.add('animate'));
    currentMarkers.forEach(marker => marker.classList.add('animate'));
    multiplierValues.forEach(value => value.classList.add('animate'));
  }
}

/**
 * Handle fragment visibility changes
 */
function handleFragmentVisibility(fragment, isVisible) {
  if (!fragment) return;
  
  // Check if it's a business impact slide fragment
  if (fragment.closest('.business-impact-slide')) {
    // Find all animation elements within this fragment
    const ringCircle = fragment.querySelector('.progress-ring-circle-value');
    const animateCount = fragment.querySelector('.animate-count');
    const multiplierProgress = fragment.querySelector('.multiplier-progress');
    const activeMarkers = fragment.querySelectorAll('.multiplier-marker.active');
    const currentMarker = fragment.querySelector('.multiplier-marker.current');
    const multiplierValue = fragment.querySelector('.multiplier-value');
    
    if (isVisible) {
      // Animate the progress ring
      if (ringCircle) {
        // Get the target percentage from the associated counter
        const percentEl = fragment.querySelector('.animate-count');
        let targetPercent = 0;
        
        if (percentEl) {
          targetPercent = parseInt(percentEl.style.getPropertyValue('--target-value') || "0");
        }
        
        // Calculate the appropriate strokeDashoffset
        const circumference = parseFloat(ringCircle.getAttribute('data-circumference') || 2 * Math.PI * 20);
        const targetOffset = calculateOffset(targetPercent, circumference);
        
        // Apply the calculated offset
        ringCircle.style.setProperty('--target-offset', targetOffset);
        ringCircle.classList.add('animate');
      }
      
      // Animate the counter
      if (animateCount) {
        animateCount.classList.add('animate');
      }
      
      // Animate the multiplier progress bar
      if (multiplierProgress) {
        multiplierProgress.classList.add('animate');
      }
      
      // Animate the active markers
      if (activeMarkers.length) {
        activeMarkers.forEach(marker => marker.classList.add('animate'));
      }
      
      // Animate the current marker
      if (currentMarker) {
        currentMarker.classList.add('animate');
      }
      
      // Animate the multiplier value
      if (multiplierValue) {
        multiplierValue.classList.add('animate');
      }
    } else {
      // Reset the progress ring animation
      if (ringCircle) {
        const circumference = parseFloat(ringCircle.getAttribute('data-circumference') || 2 * Math.PI * 20);
        ringCircle.style.strokeDashoffset = circumference; // Reset to 0%
        ringCircle.classList.remove('animate');
      }
      
      // Reset the counter animation
      if (animateCount) {
        animateCount.classList.remove('animate');
      }
      
      // Reset the multiplier progress animation
      if (multiplierProgress) {
        multiplierProgress.style.width = '0%';
        multiplierProgress.classList.remove('animate');
      }
      
      // Reset the active markers animation
      if (activeMarkers.length) {
        activeMarkers.forEach(marker => marker.classList.remove('animate'));
      }
      
      // Reset the current marker animation
      if (currentMarker) {
        currentMarker.classList.remove('animate');
      }
      
      // Reset the multiplier value animation
      if (multiplierValue) {
        multiplierValue.classList.remove('animate');
      }
    }
  }
}

/**
 * Calculate stroke-dashoffset based on percentage
 */
function calculateOffset(percent, circumference) {
  return circumference - (circumference * percent / 100);
}

/**
 * Setup the Storylane demos for agent cards
 */
function setupStorylaneDemos() {
  // Check if we're on the intelligent agents slide
  const agentsSlide = document.querySelector('.intelligent-agents-slide');
  if (!agentsSlide) return;
  
  // Remove any existing event listeners from agent cards
  document.querySelectorAll('.agent-card[data-storylane-url]').forEach(card => {
    card.removeAttribute('onclick');
    
    // Add visual feedback for clickability
    card.classList.add('clickable');
    
    // Add click handler to open in new tab
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Open link in new tab
      window.open(card.dataset.storylaneUrl, '_blank');
      
      // Visual feedback on click
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });

  // Add keyboard navigation for accessibility
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      const focusedCard = document.activeElement;
      if (focusedCard && focusedCard.classList.contains('agent-card') && focusedCard.dataset.storylaneUrl) {
        event.preventDefault();
        window.open(focusedCard.dataset.storylaneUrl, '_blank');
      }
    }
  });
}

// Removing old modal-related functions since we're now using direct links in new tabs

/**
 * Setup logo pulse effects
 */
function setupLogoPulseEffects() {
  // Remove inline onclick handlers
  document.querySelectorAll('.company-logo, .fusefy-logo').forEach(logo => {
    logo.removeAttribute('onclick');
  });
  
  // Use event delegation for logo clicks
  document.addEventListener('click', function(event) {
    const logo = event.target.closest('.company-logo, .fusefy-logo');
    if (logo) {
      event.preventDefault();
      event.stopPropagation();
      
      logo.classList.add('pulse');
      setTimeout(() => logo.classList.remove('pulse'), 500);
      
      return false;
    }
  });
}

/**
 * Setup other miscellaneous interactions
 */
function setupMiscInteractions() {
  // Reset animations when slides become visible
  const aiSlide = document.querySelector('.ai-adoption-slide');
  if (aiSlide) {
    // Only run if not already initialized or if slide is active
    if (!aiSlide.dataset.initialized || 
        (typeof Reveal !== 'undefined' && Reveal.getCurrentSlide() === aiSlide)) {
      
      // Show content set 1 by default
      const contentSet1 = document.getElementById('content-set-1');
      const contentSet2 = document.getElementById('content-set-2');
      
      if (contentSet1 && contentSet2) {
        contentSet1.style.display = 'block';
        contentSet2.style.display = 'none';
      }
      
      // Reset and restart animations
      const animatedElements = aiSlide.querySelectorAll('.animate-on-load');
      animatedElements.forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth; // Force reflow
        el.style.animation = '';
      });
      
      // Ensure next button is visible
      const buttonDiv = document.getElementById('next-button-wrapper');
      if (buttonDiv) {
        buttonDiv.style.opacity = '0';
        buttonDiv.style.animation = 'none';
        void buttonDiv.offsetWidth; // Force reflow
        buttonDiv.style.animation = 'fadeIn 0.8s 1.8s forwards';
        setTimeout(() => {
          if (getComputedStyle(buttonDiv).opacity === '0') {
            buttonDiv.style.opacity = '1';
          }
        }, 2500);
      }
      
      // Mark as initialized
      aiSlide.dataset.initialized = 'true';
    }
  }
  
  // Setup Storylane modals for agent slides
  setupStorylaneDemos();
}
