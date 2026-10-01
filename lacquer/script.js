// Tabs
document.querySelectorAll('.tab').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// Mobile nav
var toggle = document.querySelector('.nav-toggle');
var links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', function () { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });
}

// Booking form — wire to Formspree (or any form backend)
// 1. Create a free form at https://formspree.io and paste your endpoint below.
// 2. Until then, submissions show a friendly confirmation locally.
var FORMSPREE_ENDPOINT = '';
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var note = document.getElementById('formNote');
  if (!FORMSPREE_ENDPOINT) {
    note.textContent = 'Thanks! Your request was noted — connect Formspree in script.js to receive bookings by email.';
    this.reset();
    return;
  }
  var data = new FormData(this);
  var form = this;
  fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
    .then(function (r) {
      if (r.ok) { note.textContent = 'Request received! We will confirm your appointment shortly.'; form.reset(); }
      else { note.textContent = 'Something went wrong — please call us instead.'; }
    })
    .catch(function () { note.textContent = 'Something went wrong — please call us instead.'; });
});
