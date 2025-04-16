const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
  });
});

document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('nav-active') &&
    !navLinks.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var logo = document.querySelector(".header-container .logo");
  if (logo) {
    logo.addEventListener("click", function() {
      window.location.href = "index.html";
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const devisBtn = document.querySelector('.devis-btn');
  if (!devisBtn) return;

  devisBtn.addEventListener('click', () => {
    window.location.href = 'https://form.typeform.com/to/egofKTXa';
  });
});

const offerBanner = document.querySelector('.offer-banner-bottom');
let lastScrollBottom = 0;
let bannerHeight = offerBanner.offsetHeight;

window.addEventListener('resize', () => {
  bannerHeight = offerBanner.offsetHeight;
});

window.addEventListener('scroll', () => {
  const scrollBottom = window.pageYOffset || document.documentElement.scrollBottom;
  if (scrollBottom > lastScrollBottom) {
    offerBanner.style.bottom = `-${bannerHeight}px`;
  } else {
    offerBanner.style.bottom = '0';
  }
  lastScrollBottom = scrollBottom;
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-inner .slide');
const totalSlides = slides.length;
const carouselInner = document.querySelector('.carousel-inner');

carouselInner.style.width = `${100 * totalSlides}%`;
slides.forEach(slide => {
  slide.style.width = `${100 / totalSlides}%`;
});

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

function changeSlide(step) {
  currentSlide = (currentSlide + step + totalSlides) % totalSlides;
  updateCarousel();
}

document.querySelector('.carousel-control.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.carousel-control.next').addEventListener('click', () => changeSlide(1));

setInterval(() => {
  changeSlide(1);
}, 5000);

updateCarousel();

// Exemple simple d'un compte à rebours sur 24h
const countdownElement = document.getElementById("countdown");
const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000);

const interval = setInterval(() => {
  const now = new Date();
  const distance = deadline - now;
  if (distance < 0) {
    clearInterval(interval);
    countdownElement.innerHTML = "L'offre est terminée";
    return;
  }
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}, 1000);

emailjs.init("cyYjm4hHlRdYwNrkL");

// Sélection du formulaire et de l'élément de feedback
const mailForm = document.getElementById("mailForm");
const formFeedback = document.getElementById("formFeedback");

// Écouteur d'événement pour le submit du formulaire
mailForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (name === "" || email === "" || message === "") {
    formFeedback.style.color = "red";
    formFeedback.textContent = "Tous les champs sont obligatoires.";
    return;
  }

  // Envoi de l'email via EmailJS
  // Remplacez "template_YOUR_TEMPLATE_ID" par l'ID de votre template dans EmailJS.
  emailjs.sendForm('service_920psxp', 'template_j8o5t2o', this)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formFeedback.style.color = "green";
        formFeedback.textContent = "Merci ! Votre message a été envoyé.";
        mailForm.reset();
    }, function(error) {
        console.error('FAILED...', error);
        formFeedback.style.color = "red";
        formFeedback.textContent = "Erreur lors de l’envoi du message. Veuillez réessayer.";
    });
});