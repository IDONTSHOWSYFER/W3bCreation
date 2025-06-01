const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
    burger.classList.remove("toggle");
  });
});

document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("nav-active") &&
    !navLinks.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navLinks.classList.remove("nav-active");
    burger.classList.remove("toggle");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var logo = document.querySelector(".header-container .logo");
  if (logo) {
    logo.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const devisBtn = document.querySelector(".devis-btn");
  if (!devisBtn) return;

  devisBtn.addEventListener("click", () => {
    window.location.href = "https://form.typeform.com/to/egofKTXa";
  });
});

const offerBanner = document.querySelector(".offer-banner-bottom");
let lastScrollBottom = 0;
let bannerHeight = offerBanner.offsetHeight;

window.addEventListener("resize", () => {
  bannerHeight = offerBanner.offsetHeight;
});

/* ===== Affichage intelligent de l’offre spéciale ===== */
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.offer-banner-bottom');
  const footer = document.querySelector('footer');

  /* Animation douce ----------------------------------------------------- */
  banner.style.transition = 'transform .35s ease, opacity .35s ease';

  /* Helpers ------------------------------------------------------------- */
  const hide = () => {
    banner.style.transform     = `translateY(${banner.offsetHeight}px)`;
    banner.style.opacity       = '0';
    banner.style.pointerEvents = 'none';
  };
  const show = () => {
    banner.style.transform     = 'translateY(0)';
    banner.style.opacity       = '1';
    banner.style.pointerEvents = 'auto';
  };

  /* États combinés ------------------------------------------------------ */
  let footerVisible = false;   // vrai si le footer touche l’écran
  const TOP_THRESHOLD = 80;    // px : au-dessus → on considère “tout en haut”

  const handleScroll = () => {
    const atTop    = window.scrollY <= TOP_THRESHOLD;
    const atBottom = window.innerHeight + window.scrollY
                   >= document.documentElement.scrollHeight - 1; // marge 1 px

    if (atTop || atBottom || footerVisible) hide();
    else                                    show();
  };

  window.addEventListener('scroll', handleScroll, { passive : true });
  handleScroll();                            // ⇒ applique dès le chargement

  /* Observer pour savoir quand le footer entre / sort ------------------- */
  new IntersectionObserver(entries => {
    footerVisible = entries[0].isIntersecting;
    handleScroll();                          // ré-évalue l’état global
  },{ threshold:0 }).observe(footer);
});

window.addEventListener("scroll", () => {
  const scrollBottom =
    window.pageYOffset || document.documentElement.scrollBottom;
  if (scrollBottom > lastScrollBottom) {
    offerBanner.style.bottom = `-${bannerHeight}px`;
  } else {
    offerBanner.style.bottom = "0";
  }
  lastScrollBottom = scrollBottom;
});

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-inner .slide");
const totalSlides = slides.length;
const carouselInner = document.querySelector(".carousel-inner");

carouselInner.style.width = `${100 * totalSlides}%`;
slides.forEach((slide) => {
  slide.style.width = `${100 / totalSlides}%`;
});

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${
    currentSlide * (100 / totalSlides)
  }%)`;
}

function changeSlide(step) {
  currentSlide = (currentSlide + step + totalSlides) % totalSlides;
  updateCarousel();
}

document
  .querySelector(".carousel-control.prev")
  .addEventListener("click", () => changeSlide(-1));
document
  .querySelector(".carousel-control.next")
  .addEventListener("click", () => changeSlide(1));

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
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
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
  const emailRX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  nameInp.addEventListener("input", () =>
    nameInp.classList.toggle("error", nameInp.value.trim() === "")
  );
  emailInp.addEventListener("input", () =>
    emailInp.classList.toggle("error", !emailRX.test(emailInp.value))
  );

  formFeedback.classList.remove("shake");
  void formFeedback.offsetWidth; // restart animation
  formFeedback.classList.add("shake");

  // Envoi de l'email via EmailJS
  emailjs.sendForm("service_920psxp", "template_j8o5t2o", this).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      formFeedback.style.color = "green";
      formFeedback.textContent = "Merci ! Votre message a été envoyé.";
      mailForm.reset();
    },
    function (error) {
      console.error("FAILED...", error);
      formFeedback.style.color = "red";
      formFeedback.textContent =
        "Erreur lors de l’envoi du message. Veuillez réessayer.";
    }
  );
});

/* Ajout auto classes ripple */
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".cta-btn, .devis-btn, .contact-btn")
    .forEach((btn) => {
      btn.classList.add("btn-ripple");
      btn.addEventListener("click", (e) => {
        const r = btn.getBoundingClientRect(),
          d = Math.max(r.width, r.height);
        const after = btn.style;
        after.setProperty("--x", e.clientX - r.left + "px");
        after.setProperty("--y", e.clientY - r.top + "px");
      });
    });
});
