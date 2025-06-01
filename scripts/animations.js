// Animations AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800, // transition par défaut
    once: false, // rejoue à chaque scroll
    disable: "mobile", // désactive AOS sur vieux mobiles
  });
});

/* ----------  GSAP  ---------- */

/* 3-A  : Empilement dynamique des slides Témoignages */
document.addEventListener("DOMContentLoaded", () => {
  const slides = gsap.utils.toArray(".carousel .slide");

  // Décalage progressif + apparition
  slides.forEach((card, i) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      delay: i * 0.15, // effet "cascade"
      scrollTrigger: {
        trigger: card,
        start: "top 80%", // lance quand 80 % visible
        toggleActions: "play none none reverse",
      },
    });
  });
});

/* 3-B  : Parallaxe doux sur la section Héro (facultatif) */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  gsap.to(hero, {
    backgroundPosition: "50% 80%",
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1, // défilement lisse
    },
  });
});

/* ----- Sticky CTA mobile : apparition retardée + masquage au footer ----- */
document.addEventListener('DOMContentLoaded', ()=>{
  const bar    = document.getElementById('mobile-sticky');
  const footer = document.querySelector('footer');

  /* 1/ apparition douce après 6 s */
  setTimeout(()=> bar.hidden = false, 6000);

  /* 2/ observe le footer : si visible → on cache la barre */
  const io = new IntersectionObserver(entries=>{
     const visible = entries[0].isIntersecting;
     /* on joue sur l’opacité pour une transition clean + on coupe les clics */
     bar.style.opacity        = visible ? '0' : '1';
     bar.style.pointerEvents  = visible ? 'none' : 'auto';
  }, {root:null, threshold:0});     // threshold 0 = dès qu’un pixel apparaît
  io.observe(footer);
});

/* ---- Tilt 3D logos CMS ---- */
document.addEventListener("DOMContentLoaded", () => {
  VanillaTilt.init(document.querySelectorAll(".cms-logos img"), {
    max: 15, // inclinaison maxi
    speed: 400, // vitesse de retour
    glare: true, // reflet
    "max-glare": 0.2,
  });
});

/* Popup uniquement si :
   - page scrollable (maxScroll > 200 px)
   - utilisateur a scrollé plus de 75 %
------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  // pas de popup mobile
  if (window.innerWidth < 800) return;

  const popup = document.getElementById("exit-popup");
  const close = popup.querySelector(".close");
  const btn = popup.querySelector("#popup-cta");
  let shown = false;

  const onScroll = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    // page trop courte : on ne montrera jamais le popup
    if (maxScroll < 200) {
      window.removeEventListener("scroll", onScroll);
      return;
    }

    const scrolledPct = window.scrollY / maxScroll;

    if (!shown && scrolledPct > 0.75) {
      popup.hidden = false; // ← affichage
      shown = true;
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // fermetures
  close.addEventListener("click", () => popup.remove());
  btn.addEventListener("click", () =>
    window.open("https://view.forms.app/seo-checklist", "_blank")
  );
});

/* Compteurs animés */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".count").forEach((num) => {
    const target = +num.dataset.target;
    const inc = Math.ceil(target / 100);

    const animate = () => {
      const curr = +num.innerText;
      if (curr < target) {
        num.innerText = curr + inc;
        requestAnimationFrame(animate);
      } else {
        num.innerText = target;
      }
    };

    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        animate();
        obs.disconnect();
      }
    }).observe(num);
  });
});

/* Parallax calques Hero */
document.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".hero-layer").forEach((layer, i) => {
    gsap.fromTo(
      layer,
      { y: -40 * i },
      {
        y: 40 * i,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });
});

/* Slide-in pour la colonne arguments + zoom logos CMS */
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".arguments-columns .pros", {
    x: -60,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: { trigger: ".arguments-columns", start: "top 80%" },
  });
  gsap.from(".arguments-columns .cons", {
    x: 60,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: { trigger: ".arguments-columns", start: "top 80%" },
  });
  gsap.from(".cms-logos img", {
    scale: 0.5,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    scrollTrigger: { trigger: ".cms-logos", start: "top 80%" },
  });
});

document.addEventListener(
  "scroll",
  () => {
    const doc = document.documentElement;
    const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    document.getElementById("progressbar").style.width = pct * 100 + "%";
  },
  { passive: true }
);
