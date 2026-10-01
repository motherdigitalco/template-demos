/* ============================================================
   INKWELL TEMPLATE — script.js
   Vanilla JS, no dependencies. Each feature is commented so
   buyers can tweak or remove anything with confidence.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header border on scroll ---------- */
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

  /* ---------- Services tabs ---------- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".tab-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
    });
  });

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

  /* ---------- Consultation form (front-end validation + demo confirm) ----------
     To receive real submissions, point the <form> at a free endpoint
     (see the HTML comment above the form) — then delete the
     e.preventDefault() line below so the form submits normally. */
  var form = document.getElementById("bookingForm");
  var msg = document.getElementById("formMsg");

  // Don't allow past dates in the date picker
  var dateInput = document.getElementById("fDate");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ← remove this line once the form posts to a real endpoint
    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var empty = !field.value || !field.value.trim();
      field.classList.toggle("error", empty);
      if (empty) valid = false;
    });
    if (!valid) {
      msg.textContent = "Please fill in your name, phone, date, and artist.";
      msg.className = "form-msg error";
      return;
    }
    var name = document.getElementById("fName").value.trim().split(" ")[0];
    msg.textContent =
      "Thanks, " + name + "! Your consult request is in — we'll reply within one business day.";
    msg.className = "form-msg success";
    form.reset();
  });
  // Clear the error highlight as the visitor types
  form.querySelectorAll("[required]").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("error");
    });
  });

  /* ---------- Footer year (always current) ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
