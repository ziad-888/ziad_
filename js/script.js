// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initTypingAnimation();
  initSmoothScroll();
  initScrollReveal();
  initProgressBars();
  initFormValidation();
  initNavbarScroll();
});

// Typing Animation
function initTypingAnimation() {
  const textElement = document.getElementById("typing-text");
  const texts = [
    "Designing end-to-end data pipelines and scalable systems",
    "Bridging backend engineering with data science",
    "Transforming raw data into impactful insights",
    "From database to dashboard: delivering complete analytics experiences",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before typing
    }

    setTimeout(typeText, typeSpeed);
  }

  typeText();
}

// Smooth Scroll Navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".service-card, .skill-item, .project-card, .about-content, .about-image"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal", "active");
      }
    });
  }, observerOptions);

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

// Progress Bar Animation
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  const progressObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");

          setTimeout(() => {
            progressBar.style.width = width + "%";
          }, 500);

          progressObserver.unobserve(progressBar);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
}

// Form Validation
function initFormValidation() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateField(this);
      }
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Simulate form submission
      showSuccessMessage();
      form.reset();
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = "";

  // Remove existing validation classes
  field.classList.remove("is-invalid", "is-valid");

  // Validation rules
  switch (fieldName) {
    case "name":
      if (value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters long";
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "message":
      if (value.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters long";
      }
      break;
  }

  // Apply validation result
  if (isValid) {
    field.classList.add("is-valid");
  } else {
    field.classList.add("is-invalid");
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.textContent = errorMessage;
    }
  }

  return isValid;
}

function showSuccessMessage() {
  // Create success message
  const successAlert = document.createElement("div");
  successAlert.className =
    "alert alert-success alert-dismissible fade show position-fixed";
  successAlert.style.cssText =
    "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
  successAlert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Success!</strong> Your message has been sent successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(successAlert);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (successAlert.parentNode) {
      successAlert.remove();
    }
  }, 5000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });
}

// Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// Initialize active nav link tracking
updateActiveNavLink();

// Parallax Effect for Hero Section
function initParallax() {
  const heroBackground = document.querySelector(".hero-background");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Initialize parallax
initParallax();

// Loading Animation
function initLoadingAnimation() {
  // Add loading class to body
  document.body.classList.add("loading");

  // Remove loading class when page is fully loaded
  window.addEventListener("load", function () {
    document.body.classList.remove("loading");
  });
}

// Initialize loading animation
initLoadingAnimation();

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Any scroll-based functionality can be added here
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Service Worker Registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed");
      });
  });
}

// Add smooth hover effects to cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".service-card, .project-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Initialize card hover effects
initCardHoverEffects();

// Add click animation to buttons
function initButtonAnimations() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize button animations
initButtonAnimations();
