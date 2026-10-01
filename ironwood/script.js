/* ============================================================
   IRONWOOD TEMPLATE — script.js
   Vanilla JS, no dependencies. Each feature is commented so
   buyers can tweak or remove anything with confidence.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header: add shadow once scrolled ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  navToggle.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  // Close the mobile menu when a link is tapped
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Plan gallery filtering ---------- */
  var pills = document.querySelectorAll(".filter-pill");
  var cards = document.querySelectorAll(".plan-card");
  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) { p.classList.remove("is-active"); });
      pill.classList.add("is-active");
      var filter = pill.getAttribute("data-filter");
      cards.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- "Get This Plan" buttons: preselect project type, jump to quote form ---------- */
  var typeSelect = document.getElementById("qType");
  document.querySelectorAll("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var planName = btn.getAttribute("data-plan");
      // All library plans are stock plans, so preselect that project type
      typeSelect.value = "New home — stock plan";
      var msg = document.getElementById("qMsg");
      if (msg && !msg.value) {
        msg.value = "I'm interested in " + planName + ". ";
      }
      document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Testimonial slider ---------- */
  var slider = document.getElementById("reviewSlider");
  var slides = slider.querySelectorAll(".slide");
  var dotsWrap = document.getElementById("sliderDots");
  var current = 0;
  var timer = null;

  // Build one dot per slide
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Show review " + (i + 1));
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll("button");

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle("is-active", idx === current); });
    dots.forEach(function (d, idx) { d.classList.toggle("is-active", idx === current); });
  }
  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 6000);
  }
  document.getElementById("prevSlide").addEventListener("click", function () { goTo(current - 1); restart(); });
  document.getElementById("nextSlide").addEventListener("click", function () { goTo(current + 1); restart(); });
  restart();

  /* ---------- Quote form ----------
     Works two ways:
     A) Demo mode (default): validates and shows a success message.
     B) Live mode: point the <form> at Formspree (see the comment
        above the form in index.html), then delete the single line
        marked below and the form will POST for real. */
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  form.addEventListener("submit", function (e) {
    var name = document.getElementById("qName");
    var email = document.getElementById("qEmail");
    var msg = document.getElementById("qMsg");
    var valid = true;

    [name, email, msg].forEach(function (f) { f.classList.remove("field-error"); });
    note.className = "form-note";

    if (!name.value.trim()) { name.classList.add("field-error"); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add("field-error"); valid = false; }
    if (!msg.value.trim()) { msg.classList.add("field-error"); valid = false; }

    if (!valid) {
      e.preventDefault();
      note.textContent = "Fill in your name, a valid email, and a few words about the project.";
      note.classList.add("is-error");
      return;
    }

    // remove this line once the form posts to a real endpoint
    e.preventDefault();
    note.textContent = "Request received. I'll get back to you within two business days.";
    note.classList.add("is-success");
    form.reset();
  });

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything if the browser lacks IntersectionObserver
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
