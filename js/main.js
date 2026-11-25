/* ==========================================================================
   JBBM Infraservices - Main JavaScript
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    /* Go to top button */
    const goTop = document.getElementById("goTopBtn");
    if (goTop) {
      if (window.scrollY > 300) {
        goTop.classList.add("visible");
      } else {
        goTop.classList.remove("visible");
      }
    }

    /* Active nav link on scroll */
    updateActiveLink();
  });

  /* ---------- Mobile menu toggle ---------- */
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Active nav link by scroll position ---------- */
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href.includes("#" + current)) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- Go to top ---------- */
  const goTop = document.getElementById("goTopBtn");
  if (goTop) {
    goTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const goTopFloat = document.getElementById("goTopFloat");
  if (goTopFloat) {
    goTopFloat.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Auto-rotating Hero Slider (Home page) ---------- */
  const heroSlides = document.querySelectorAll(".hero .slide");
  const heroIndicators = document.querySelectorAll(".hero .indicator");
  const heroPrev = document.querySelector(".hero .slider-arrow.prev");
  const heroNext = document.querySelector(".hero .slider-arrow.next");

  let heroIndex = 0;
  const heroCount = heroSlides.length;
  let heroTimer;

  if (heroSlides.length > 0) {
    function showHeroSlide(index) {
      heroSlides.forEach((s) => s.classList.remove("active"));
      heroIndicators.forEach((i) => i.classList.remove("active"));

      heroIndex = (index + heroCount) % heroCount;
      heroSlides[heroIndex].classList.add("active");
      if (heroIndicators[heroIndex]) {
        heroIndicators[heroIndex].classList.add("active");
      }
    }

    function nextHeroSlide() {
      showHeroSlide(heroIndex + 1);
    }

    function prevHeroSlide() {
      showHeroSlide(heroIndex - 1);
    }

    function resetHeroTimer() {
      clearInterval(heroTimer);
      heroTimer = setInterval(nextHeroSlide, 3000);
    }

    if (heroPrev) heroPrev.addEventListener("click", () => {
      prevHeroSlide();
      resetHeroTimer();
    });
    if (heroNext) heroNext.addEventListener("click", () => {
      nextHeroSlide();
      resetHeroTimer();
    });

    heroIndicators.forEach((ind, i) => {
      ind.addEventListener("click", () => {
        showHeroSlide(i);
        resetHeroTimer();
      });
    });

    const heroSlider = document.querySelector(".hero .slider");
    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", () => clearInterval(heroTimer));
      heroSlider.addEventListener("mouseleave", resetHeroTimer);
    }

    resetHeroTimer();
  }

  /* ---------- Auto-rotating Home Gallery Slider ---------- */
  const homeGalleryTrack = document.querySelector(".home-gallery-slider .gallery-track");
  const homeGallerySlides = document.querySelectorAll(".home-gallery-slider .gallery-slide");
  const homeGalleryIndicators = document.querySelectorAll(".home-gallery-indicators .indicator");

  let galleryIndex = 0;
  const galleryCount = homeGallerySlides.length;
  let galleryTimer;
  const galleryInterval = 3000;

  if (homeGalleryTrack && homeGallerySlides.length > 0) {
    function showGallerySlide(index) {
      galleryIndex = (index + galleryCount) % galleryCount;
      const slideWidth = homeGallerySlides[0].offsetWidth || 320;
      homeGalleryTrack.scrollTo({
        left: galleryIndex * slideWidth,
        behavior: "smooth",
      });

      homeGalleryIndicators.forEach((ind) => ind.classList.remove("active"));
      if (homeGalleryIndicators[galleryIndex]) {
        homeGalleryIndicators[galleryIndex].classList.add("active");
      }
    }

    function nextGallerySlide() {
      showGallerySlide(galleryIndex + 1);
    }

    function prevGallerySlide() {
      showGallerySlide(galleryIndex - 1);
    }

    function resetGalleryTimer() {
      clearInterval(galleryTimer);
      galleryTimer = setInterval(nextGallerySlide, galleryInterval);
    }

    /* Manual arrows */
    const galleryPrev = document.querySelector(".home-gallery-slider .gallery-prev");
    const galleryNext = document.querySelector(".home-gallery-slider .gallery-next");
    if (galleryPrev) galleryPrev.addEventListener("click", () => {
      prevGallerySlide();
      resetGalleryTimer();
    });
    if (galleryNext) galleryNext.addEventListener("click", () => {
      nextGallerySlide();
      resetGalleryTimer();
    });

    /* Indicators */
    homeGalleryIndicators.forEach((ind, i) => {
      ind.addEventListener("click", () => {
        showGallerySlide(i);
        resetGalleryTimer();
      });
    });

    /* Pause on hover */
    const galleryContainer = document.querySelector(".home-gallery-slider");
    if (galleryContainer) {
      galleryContainer.addEventListener("mouseenter", () => clearInterval(galleryTimer));
      galleryContainer.addEventListener("mouseleave", resetGalleryTimer);
    }

    /* Sync indicators on manual scroll */
    homeGalleryTrack.addEventListener("scroll", () => {
      const slideWidth = homeGallerySlides[0].offsetWidth || 320;
      const idx = Math.round(homeGalleryTrack.scrollLeft / slideWidth);
      if (idx >= 0 && idx < galleryCount && idx !== galleryIndex) {
        galleryIndex = idx;
        homeGalleryIndicators.forEach((ind) => ind.classList.remove("active"));
        if (homeGalleryIndicators[galleryIndex]) {
          homeGalleryIndicators[galleryIndex].classList.add("active");
        }
      }
    });

    resetGalleryTimer();
  }

  /* ---------- Contact form submission ---------- */
  const contactForms = document.querySelectorAll("form.contact-form, form#contactForm");
  contactForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit'], input[type='submit']");
      const originalText = btn ? btn.innerText : "";
      if (btn) {
        btn.innerText = "Sending...";
        btn.disabled = true;
      }

      setTimeout(() => {
        const msg = form.querySelector(".form-message");
        if (msg) {
          msg.className = "form-message success";
          msg.textContent = "Thank you! Your message has been sent successfully. We will get back to you soon.";
        }
        if (btn) {
          btn.innerText = originalText;
          btn.disabled = false;
        }
        form.reset();

        setTimeout(() => {
          if (msg) msg.style.display = "none";
        }, 7000);
      }, 1500);
    });
  });

  /* ---------- Filter buttons (Gallery page) ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryBoxes = document.querySelectorAll(".gallery-box");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      galleryBoxes.forEach((box) => {
        if (filter === "all" || box.getAttribute("data-category") === filter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      });
    });
  });

})();
