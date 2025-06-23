// Menu burger responsive
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links") || document.querySelector(".navbar ul");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Animation au scroll (fade-in)
const faders = document.querySelectorAll(".service-card, .contact, .hero-content");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => {
  appearOnScroll.observe(el);
});
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  const res = await fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const msg = await res.text();
  alert(msg);
  form.reset();
});
// Bouton retour en haut
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});



(function(){
  emailjs.init("4iGVlNFEdP_AymO2p"); // Remplace par ton User ID
})();

// Remplacement du const form existant pour utiliser EmailJS
form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_g6qpvd7", "template_mideessi_work", this)
    .then(function(response) {
      alert("Message envoyé avec succès !");
      form.reset();
    }, function(error) {
      alert("Erreur lors de l'envoi du message.");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Optionnel : ne ré-anime pas si rescroll
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    messageBox.style.display = "none";

    emailjs.sendForm("TON_SERVICE_ID", "TON_TEMPLATE_ID", this)
      .then(function () {
        showMessage("Message envoyé avec succès ✅", "success");
        form.reset();
      })
      .catch(function () {
        showMessage("Erreur lors de l'envoi. Réessayez plus tard ❌", "error");
      });
  });

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = "form-message " + type;
    messageBox.style.display = "block";

    setTimeout(function () {
      messageBox.style.display = "none";
    }, 4000);
  }
});