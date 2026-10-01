/* ============================================================
   WAG & WANDER TEMPLATE - script.js
   Vanilla JS, no dependencies. Each feature is commented so
   buyers can tweak or remove anything with confidence.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  navToggle.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  // Close the mobile menu when a link is tapped
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for very old browsers: show everything
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Testimonial slider ---------- */
  var slides = document.querySelectorAll("#reviewSlider .slide");
  var dots = document.querySelectorAll("#reviewSlider .dot");
  var current = 0;
  var timer = null;

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }
  function autoPlay() {
    timer = setInterval(function () { goTo(current + 1); }, 6000);
  }
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      goTo(Number(dot.dataset.slide));
      autoPlay(); // restart the timer after manual change
    });
  });
  autoPlay();

  /* ---------- FAQ accordion ----------
     Classic accordion: opening one question closes the others.
     The answer panel animates via max-height set from scrollHeight,
     so answers of any length open smoothly. */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Demo form handling (intake + contact) ----------
     Front-end validation + friendly demo confirmation.
     To receive real submissions, point each <form> at a free
     endpoint (see the HTML comments above the forms), e.g.:
       <form action="https://formspree.io/f/YOUR_ID" method="POST">
     Then delete the e.preventDefault() line below so the form
     submits normally. */
  var intakeForm = document.getElementById("intakeForm");
  var intakeMsg = document.getElementById("intakeMsg");
  var contactForm = document.getElementById("contactForm");
  var contactMsg = document.getElementById("contactMsg");

  // Simple email check (good enough for front-end validation)
  function emailLooksValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Validate every [required] field: filled in, valid email, or checked box
  function validateForm(form) {
    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var value = (field.value || "").trim();
      var bad = !value ||
        (field.type === "email" && !emailLooksValid(value)) ||
        (field.type === "checkbox" && !field.checked);
      field.classList.toggle("error", bad);
      if (bad) valid = false;
    });
    return valid;
  }

  // Clear the error highlight as the visitor types or changes a field
  function clearErrorsOnEdit(form) {
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("input", function () { field.classList.remove("error"); });
      field.addEventListener("change", function () { field.classList.remove("error"); });
    });
  }

  // Pet intake form
  intakeForm.addEventListener("submit", function (e) {
    e.preventDefault(); // ← remove this line once the form posts to a real endpoint
    if (!validateForm(intakeForm)) {
      intakeMsg.textContent = "Please complete the required fields: pet name, species, and emergency contact.";
      intakeMsg.className = "form-msg error";
      return;
    }
    var pet = (document.getElementById("iPetName").value || "").trim().split(" ")[0] || "your pet";
    intakeMsg.textContent =
      "Thanks! " + pet + "'s profile is received. Maya will review it before your meet & greet.";
    intakeMsg.className = "form-msg success";
    intakeForm.reset();
  });
  clearErrorsOnEdit(intakeForm);

  // Contact / meet & greet form
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // ← remove this line once the form posts to a real endpoint
    if (!validateForm(contactForm)) {
      contactMsg.textContent = "Please add your name, a valid email, and a service.";
      contactMsg.className = "form-msg error";
      return;
    }
    var name = document.getElementById("cName").value.trim().split(" ")[0];
    contactMsg.textContent =
      "Thanks, " + name + "! Your request is in. We'll reply within one business day to schedule your free meet & greet.";
    contactMsg.className = "form-msg success";
    contactForm.reset();
  });
  clearErrorsOnEdit(contactForm);

  /* ---------- Footer year (always current) ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
