/* ============================================================
   SPARK & SHINE TEMPLATE: script.js
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

  /* ---------- Service checklist tabs ---------- */
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

  /* ---------- Before / after drag slider ---------- */
  var baSlider = document.getElementById("baSlider");
  var baBefore = document.getElementById("baBefore");
  var baHandle = document.getElementById("baHandle");
  var dragging = false;

  function setBA(clientX) {
    var rect = baSlider.getBoundingClientRect();
    var pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    baBefore.style.width = pct + "%";
    baHandle.style.left = pct + "%";
  }
  baHandle.addEventListener("pointerdown", function (e) {
    dragging = true;
    try { baHandle.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
    setBA(e.clientX);
  });
  baHandle.addEventListener("pointermove", function (e) {
    if (dragging) setBA(e.clientX);
  });
  ["pointerup", "pointercancel"].forEach(function (evt) {
    baHandle.addEventListener(evt, function () { dragging = false; });
  });
  // Tapping the image also moves the divider
  baSlider.addEventListener("pointerdown", function (e) {
    if (e.target !== baHandle && !baHandle.contains(e.target)) setBA(e.clientX);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // Close any open item first (accordion behavior)
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Estimate request form ----------
     Front-end validation + friendly confirmation.
     This is a template demo, so the form does not send anywhere yet.
     To receive real submissions, point the <form> at a free
     endpoint (see the HTML comment above the form), then delete
     the e.preventDefault() line below so the form submits normally. */
  var form = document.getElementById("estimateForm");
  var msg = document.getElementById("estimateMsg");

  // Simple email check (good enough for front-end validation)
  function emailLooksValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ← remove this line once the form posts to a real endpoint
    var valid = true;

    form.querySelectorAll("[required]").forEach(function (field) {
      var value = (field.value || "").trim();
      var bad = !value || (field.type === "email" && !emailLooksValid(value));
      field.classList.toggle("error", bad);
      if (bad) valid = false;
    });

    if (!valid) {
      msg.textContent = "Please fill in your name, a valid email, and the home details.";
      msg.className = "form-msg error";
      return;
    }

    var name = document.getElementById("eName").value.trim().split(" ")[0];
    var service = document.getElementById("eService").value;
    msg.textContent =
      "Thanks, " + name + "! Your " + service.toLowerCase() +
      " estimate request is in. Expect a firm written quote within one business day.";
    msg.className = "form-msg success";
    form.reset();
  });
  // Clear the error highlight as the visitor types
  form.querySelectorAll("[required]").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("error");
    });
    field.addEventListener("change", function () {
      field.classList.remove("error");
    });
  });

  /* ---------- Footer year (always current) ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
