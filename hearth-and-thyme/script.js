/* ============================================================
   HEARTH & THYME TEMPLATE — script.js
   Vanilla JS, no dependencies. Each feature is commented so
   buyers can tweak or remove anything with confidence.
   ============================================================ */
(function () {
  "use strict";

  /* ==========================================================
     ★ EDIT YOUR RECIPES HERE ★
     Each recipe needs: title, kicker (category label shown in
     the modal), time, difficulty, servings, ingredients (array
     of strings), steps (array of strings), and an optional
     note (shown in the green tip box — delete it if unneeded).
     The recipe "id" must match the data-recipe value on its
     card in index.html. To add a recipe: copy one card in the
     HTML, give it a new data-recipe id, and add a matching
     entry here.
     ========================================================== */
  var RECIPES = {
    "apple-pie": {
      title: "Cast-Iron Skillet Apple Pie",
      kicker: "Baking",
      time: "1 hr 15 min + cooling",
      difficulty: "Medium",
      servings: "Serves 8",
      ingredients: [
        "2 discs pie dough, homemade or store-bought, chilled",
        "6–7 tart apples (Honeycrisp or Granny Smith), peeled and sliced 1/4-inch thick",
        "3/4 cup granulated sugar, plus 1 tbsp for sprinkling",
        "2 tbsp all-purpose flour",
        "1 tsp ground cinnamon",
        "1/4 tsp ground nutmeg",
        "1 tbsp fresh lemon juice",
        "2 tbsp cold butter, cut into small cubes",
        "1 egg beaten with 1 tbsp milk, for the egg wash",
        "Coarse sugar, for sprinkling"
      ],
      steps: [
        "Heat the oven to 425°F (220°C). Place a 10-inch cast-iron skillet in the oven while it heats — a hot skillet is the secret to a crisp bottom crust.",
        "Toss the apple slices with the lemon juice, sugar, flour, cinnamon, and nutmeg. Let them sit 10 minutes so the juices start to release.",
        "Roll one dough disc into a 12-inch round. Carefully pull the hot skillet from the oven, drape the dough over it, and press it gently into the corners, letting the excess hang over the edge.",
        "Fill with the apples and all their juices. Dot the top with the cold butter cubes.",
        "Roll the second disc into an 11-inch round and cut it into 1-inch strips. Weave a lattice over the filling, then trim and crimp the edges together.",
        "Brush the lattice with egg wash and sprinkle generously with coarse sugar.",
        "Bake 20 minutes at 425°F, then reduce to 375°F (190°C) and bake 35–40 minutes more, until the crust is deep golden and the juices bubble thickly through the lattice.",
        "Cool on a wire rack at least 2 hours before slicing — the filling needs this time to set. Serve warm with sharp cheddar or vanilla ice cream."
      ],
      note: "No cast iron? A 9-inch deep-dish pie plate works — add 10 minutes to the bake time and place it on a preheated baking sheet."
    },
    "pot-roast": {
      title: "Slow Sunday Pot Roast",
      kicker: "Slow Sundays",
      time: "4 hrs (mostly hands-off)",
      difficulty: "Easy",
      servings: "Serves 6",
      ingredients: [
        "1 (3–4 lb) beef chuck roast, at room temperature",
        "2 tsp kosher salt, plus more to taste",
        "1 tsp black pepper",
        "2 tbsp neutral oil",
        "1 large yellow onion, cut into wedges",
        "4 carrots, peeled and cut into 2-inch chunks",
        "1 1/2 lb baby potatoes, halved",
        "4 garlic cloves, smashed",
        "2 tbsp tomato paste",
        "2 cups beef broth",
        "1 cup dry red wine (or more broth)",
        "4 sprigs fresh thyme",
        "2 sprigs fresh rosemary",
        "2 bay leaves"
      ],
      steps: [
        "Heat the oven to 325°F (165°C). Pat the roast very dry and season all over with salt and pepper — dry meat sears instead of steaming.",
        "Heat the oil in a large Dutch oven over medium-high. Sear the roast 4–5 minutes per side until deeply browned. Transfer to a plate.",
        "Lower the heat to medium. Add the onion and cook 4 minutes, then stir in the garlic and tomato paste and cook 1 minute more, until brick-red and fragrant.",
        "Pour in the wine, scraping up every browned bit from the bottom — that's where the flavor lives. Let it reduce by half, about 3 minutes.",
        "Add the broth, thyme, rosemary, and bay leaves. Nestle the roast back in, cover, and braise in the oven for 2 hours.",
        "Add the carrots and potatoes around the roast, spooning some broth over them. Cover and braise 1 to 1 1/2 hours more, until the meat shreds easily with a fork.",
        "Rest the roast 15 minutes, then slice or shred. Skim the fat from the braising liquid, taste for salt, and serve everything in wide bowls with plenty of that gravy."
      ],
      note: "Leftovers keep 4 days refrigerated and freeze beautifully for 3 months. The flavor is even better on day two."
    },
    "shortbread": {
      title: "Honey Lavender Shortbread",
      kicker: "Baking",
      time: "45 min",
      difficulty: "Easy",
      servings: "Makes 16 wedges",
      ingredients: [
        "1 cup (2 sticks) unsalted butter, softened",
        "2/3 cup powdered sugar",
        "1/4 cup honey, plus more for drizzling",
        "2 tsp culinary lavender buds, finely ground",
        "1 tsp vanilla extract",
        "2 cups all-purpose flour",
        "1/2 tsp fine sea salt",
        "Coarse sugar, for sprinkling"
      ],
      steps: [
        "Heat the oven to 325°F (165°C). Line an 8-inch square pan with parchment, leaving overhang on two sides.",
        "Beat the butter, powdered sugar, and honey until pale and fluffy, about 3 minutes. Beat in the vanilla and ground lavender.",
        "Add the flour and salt and mix on low just until a soft dough forms — stop as soon as there are no dry streaks. Overmixing makes tough shortbread.",
        "Press the dough evenly into the pan with damp fingers or the bottom of a glass. Score into 16 squares with a sharp knife (don't cut all the way through) and prick each square twice with a fork.",
        "Chill 15 minutes — this keeps the edges sharp and the texture sandy.",
        "Sprinkle with coarse sugar and bake 30–35 minutes, until the edges are just turning golden. The center should still look pale.",
        "Cool 10 minutes in the pan, then re-cut along the scored lines. Cool completely on a rack. Drizzle with a little extra honey before serving, if you like."
      ],
      note: "Use culinary-grade lavender only (not potpourri or sachets). If lavender isn't your thing, swap it for 1 tsp lemon zest — equally lovely."
    },
    "tomato-soup": {
      title: "Creamy Tomato Basil Soup",
      kicker: "Weeknight Dinners",
      time: "35 min",
      difficulty: "Easy",
      servings: "Serves 4–6",
      ingredients: [
        "2 tbsp butter, plus 1 tbsp olive oil",
        "1 medium yellow onion, diced",
        "4 garlic cloves, minced",
        "2 (28 oz) cans crushed tomatoes",
        "2 cups vegetable broth",
        "1 tsp sugar",
        "1/2 cup heavy cream, plus more for swirling",
        "1 cup fresh basil leaves, torn, plus more for serving",
        "Salt and black pepper, to taste",
        "Grilled cheese soldiers, for serving (non-negotiable)"
      ],
      steps: [
        "Melt the butter with the olive oil in a large pot over medium heat. Add the onion with a pinch of salt and cook 6–8 minutes until soft and translucent.",
        "Stir in the garlic and cook 1 minute, just until fragrant — don't let it brown.",
        "Add the crushed tomatoes, broth, and sugar. Bring to a gentle simmer and cook 20 minutes, stirring occasionally, so the flavors marry.",
        "Stir in the basil, then blend until completely smooth with an immersion blender (or in batches in a countertop blender — vent the lid and hold it with a towel).",
        "Return to low heat and stir in the cream. Taste and season boldly with salt and pepper — canned tomatoes vary, and this soup wants to be well-seasoned.",
        "Ladle into warm bowls, swirl with a spoonful of cream, scatter torn basil over the top, and serve with grilled cheese cut into dippable strips."
      ],
      note: "PRESERVING TIP: Double the recipe and stop before adding the cream. Ladle the hot soup base into sterilized quart jars, leaving 1-inch headspace, and process in a water-bath canner 35 minutes. Stir in fresh cream when you open a jar in winter."
    },
    "cinnamon-rolls": {
      title: "Overnight Cinnamon Rolls",
      kicker: "Baking · Slow Sundays",
      time: "Overnight + 30 min bake",
      difficulty: "Medium",
      servings: "Makes 12 rolls",
      ingredients: [
        "For the dough:",
        "1 cup whole milk, warmed to 110°F",
        "2 1/4 tsp (1 packet) active dry yeast",
        "1/2 cup granulated sugar",
        "1/3 cup unsalted butter, melted",
        "1 large egg, at room temperature",
        "4 cups all-purpose flour, plus more for dusting",
        "1 tsp fine sea salt",
        "For the filling:",
        "1/2 cup unsalted butter, very soft",
        "3/4 cup packed brown sugar",
        "2 tbsp ground cinnamon",
        "For the frosting:",
        "4 oz cream cheese, softened",
        "1/4 cup unsalted butter, softened",
        "1 cup powdered sugar",
        "1 tsp vanilla extract",
        "Pinch of salt"
      ],
      steps: [
        "Stir the yeast and a pinch of the sugar into the warm milk. Let stand 5–10 minutes until foamy — if it doesn't foam, your yeast is dead; start over.",
        "Whisk in the remaining sugar, melted butter, and egg. Add the flour and salt and mix into a shaggy dough, then knead 8 minutes until smooth and elastic.",
        "Place in a greased bowl, cover, and rise in a warm spot 1 to 1 1/2 hours, until doubled.",
        "Roll the dough into a 16x12-inch rectangle. Spread with the soft butter, then sprinkle evenly with brown sugar and cinnamon, pressing gently so it sticks.",
        "Roll up tightly from the long side. Cut into 12 rolls with unflavored dental floss or a serrated knife — floss gives the cleanest swirls.",
        "Arrange in a buttered 9x13-inch pan. Cover tightly and refrigerate overnight (8–12 hours).",
        "In the morning, set the pan on the counter while the oven heats to 350°F (175°C), about 30–45 minutes — cold rolls bake up dense.",
        "Bake 25–30 minutes until golden and bubbling. Beat the frosting ingredients until smooth and spread generously over the warm rolls. Try to wait 10 minutes. (You won't.)"
      ],
      note: "No time for overnight? Let the shaped rolls rise at room temperature 45–60 minutes instead and bake the same day — still wonderful, just less of that deep developed flavor."
    },
    "focaccia": {
      title: "Garden Herb Focaccia",
      kicker: "Baking",
      time: "3 hrs (mostly rising)",
      difficulty: "Medium",
      servings: "Makes one 9x13 pan",
      ingredients: [
        "500g bread flour (about 4 cups), plus more for dusting",
        "2 tsp instant yeast",
        "2 tsp fine sea salt",
        "1 tbsp honey",
        "400 ml (1 2/3 cups) warm water",
        "1/4 cup olive oil, plus 3 tbsp for the pan and drizzling",
        "Flaky sea salt, for finishing",
        "Toppings: fresh rosemary and thyme sprigs, halved cherry tomatoes, thin red onion slices — whatever the garden offers"
      ],
      steps: [
        "Whisk the flour, yeast, and salt in a large bowl. Stir the honey into the warm water, then pour it in with 1/4 cup olive oil. Mix into a very wet, shaggy dough — wetter than you think is right.",
        "Cover and rest 15 minutes, then do a set of stretch-and-folds: grab one edge, pull it up and fold it over the center, turning the bowl as you go. Repeat 3 sets, 30 minutes apart. The dough will transform from shaggy to smooth.",
        "Pour 2 tbsp olive oil into a 9x13-inch pan and turn the dough into it, flipping once to coat. Cover and proof 1 to 1 1/2 hours, until puffy and jiggly.",
        "Heat the oven to 425°F (220°C). Drizzle the dough with the remaining olive oil. Oil your fingertips and dimple the dough firmly all over — press almost to the bottom of the pan. This is the best part; don't be shy.",
        "Arrange your herbs, tomatoes, and onion over the top like a little garden. Sprinkle generously with flaky salt.",
        "Bake 20–25 minutes until deeply golden with crisp edges. Cool 10 minutes in the pan, then slide onto a rack so the bottom stays crisp. Best eaten the day it's baked — as if that were ever a problem."
      ],
      note: "The dimpling isn't just for looks — those little wells catch olive oil and toppings so every bite is seasoned. Under-dimpled focaccia is just flatbread; commit to it."
    }
  };

  /* Icon snippets reused inside the modal meta row */
  var ICON_CLOCK = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var ICON_LEVEL = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h4v-6H4v6zm6 0h4V10h-4v10zm6 0h4V4h-4v16z" fill="currentColor"/></svg>';
  var ICON_SERVE = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2"/></svg>';

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

  /* ---------- Recipe filtering (category pills + search) ---------- */
  var pills = document.querySelectorAll(".pill");
  var cards = document.querySelectorAll(".recipe-card");
  var noResults = document.getElementById("noResults");
  var activeFilter = "all";
  var searchTerm = "";

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var cats = (card.getAttribute("data-cats") || "").split(" ");
      var matchesFilter = activeFilter === "all" || cats.indexOf(activeFilter) !== -1;
      var matchesSearch = !searchTerm ||
        card.textContent.toLowerCase().indexOf(searchTerm) !== -1;
      var show = matchesFilter && matchesSearch;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });
    noResults.classList.toggle("show", visible === 0);
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) { p.classList.remove("active"); });
      pill.classList.add("active");
      activeFilter = pill.getAttribute("data-filter");
      applyFilters();
    });
  });

  // Search: live-filter as you type, and jump to the recipe box on submit
  var searchInput = document.getElementById("searchInput");
  var searchForm = document.getElementById("searchForm");
  searchInput.addEventListener("input", function () {
    searchTerm = searchInput.value.trim().toLowerCase();
    applyFilters();
  });
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchTerm = searchInput.value.trim().toLowerCase();
    applyFilters();
    document.getElementById("recipes").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Recipe modal ---------- */
  var overlay = document.getElementById("recipeModal");
  var modalArt = document.getElementById("modalArt");
  var modalKicker = document.getElementById("modalKicker");
  var modalTitle = document.getElementById("modalTitle");
  var modalMeta = document.getElementById("modalMeta");
  var modalIngredients = document.getElementById("modalIngredients");
  var modalSteps = document.getElementById("modalSteps");
  var modalNote = document.getElementById("modalNote");
  var lastFocused = null;

  function openRecipe(id, cardEl) {
    var r = RECIPES[id];
    if (!r) return;

    // Copy the card's SVG illustration into the modal header
    var art = cardEl ? cardEl.querySelector(".card-art svg") : null;
    modalArt.innerHTML = art ? art.outerHTML : "";

    modalKicker.textContent = r.kicker;
    modalTitle.textContent = r.title;
    modalMeta.innerHTML =
      "<span>" + ICON_CLOCK + r.time + "</span>" +
      "<span>" + ICON_LEVEL + r.difficulty + "</span>" +
      "<span>" + ICON_SERVE + r.servings + "</span>";

    // Ingredients checklist — tap to check off while cooking.
    // Lines ending in ":" are treated as sub-headings (e.g. "For the dough:")
    modalIngredients.innerHTML = "";
    r.ingredients.forEach(function (item) {
      var li = document.createElement("li");
      if (/:$/.test(item)) {
        li.innerHTML = "<strong>" + item.replace(/:$/, "") + "</strong>";
        li.style.cursor = "default";
        li.style.fontFamily = "var(--font-display)";
        li.style.fontSize = "1.15rem";
        li.style.marginTop = "0.5rem";
      } else {
        li.innerHTML = '<span class="ing-check">✓</span><span class="ing-text"></span>';
        li.querySelector(".ing-text").textContent = item;
        li.addEventListener("click", function () {
          li.classList.toggle("done");
        });
      }
      modalIngredients.appendChild(li);
    });

    modalSteps.innerHTML = "";
    r.steps.forEach(function (step) {
      var li = document.createElement("li");
      li.textContent = step;
      modalSteps.appendChild(li);
    });

    if (r.note) {
      modalNote.innerHTML = "<strong>June's tip:</strong> " + r.note;
      modalNote.hidden = false;
    } else {
      modalNote.hidden = true;
    }

    lastFocused = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // lock background scroll
    document.getElementById("modalClose").focus();
  }

  function closeRecipe() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Open from recipe cards (click or Enter/Space) and the hero button
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openRecipe(card.getAttribute("data-recipe"), card);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openRecipe(card.getAttribute("data-recipe"), card);
      }
    });
  });
  document.querySelectorAll("[data-open-recipe]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-open-recipe");
      var card = document.querySelector('.recipe-card[data-recipe="' + id + '"]');
      openRecipe(id, card);
    });
  });

  document.getElementById("modalClose").addEventListener("click", closeRecipe);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeRecipe(); // click the backdrop to close
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeRecipe();
  });

  /* ---------- Print button (prints just the open recipe) ---------- */
  document.getElementById("printBtn").addEventListener("click", function () {
    window.print(); // the @media print rules in styles.css isolate the modal
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

  /* ---------- Newsletter form (front-end validation + demo confirm) ----------
     To receive real signups, point the <form> at a free endpoint
     (see the HTML comment above the form) — then delete the
     e.preventDefault() line below so the form submits normally. */
  var form = document.getElementById("newsForm");
  var msg = document.getElementById("newsMsg");
  var emailField = document.getElementById("nEmail");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ← remove this line once the form posts to a real endpoint
    var email = emailField.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailField.classList.toggle("error", !valid);
    if (!valid) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg error";
      return;
    }
    msg.textContent = "You're in! Your first Sunday Letter arrives this weekend.";
    msg.className = "form-msg success";
    form.reset();
  });
  // Clear the error highlight as the visitor types
  emailField.addEventListener("input", function () {
    emailField.classList.remove("error");
  });

  /* ---------- Footer year (always current) ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
