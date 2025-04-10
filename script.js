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

const mailForm = document.getElementById("mailForm");
const formFeedback = document.getElementById("formFeedback");

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
  formFeedback.style.color = "green";
  formFeedback.textContent = "Merci ! Votre message a été envoyé.";
  setTimeout(() => {
    mailForm.reset();
    formFeedback.textContent = "";
  }, 3000);
});

emailjs.init("YOUR_PUBLIC_KEY");