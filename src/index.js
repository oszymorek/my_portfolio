"use strict";

/// init all functions
function init() {
  smoothScroll();
  stickyNav();
  expandSection();
  slider();
  animateSection();
}

////Smooth scrolling to the indicated sections
function smoothScroll() {
  const navLink = document.querySelector(".nav__list");
  const headerBtn = document.querySelector(".header__btn");

  const toTarget = function (target, className) {
    target.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains(className)) {
        const href = e.target.getAttribute("href");
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  toTarget(navLink, "nav__list__item--link");
  toTarget(headerBtn, "btn");
}

//// Add sticky class to navigation
function stickyNav() {
  const nav = document.querySelector(".nav");
  const initialCords = nav.getBoundingClientRect();

  const conditions = function () {
    if (window.scrollY >= initialCords.height) nav.classList.add("sticky");
    if (window.scrollY === 0) nav.classList.remove("sticky");
  };

  document.addEventListener("scroll", conditions);
}

//// Expand/Hide knowledge about skills
function expandSection() {
  const btnSkills = document.querySelector(".more__skills");
  const container = document.querySelector(".knowledge__container");

  const data = [
    {
      title: "React.js",
      learn: "Future",
      img: "/img/skills_img/logo-react.svg",
      alt: "logo react",
    },
    {
      title: "Node.js",
      learn: "Future",
      img: "/img/skills_img/logo-nodejs.svg",
      alt: "logo node",
    },
    {
      title: "Express.js",
      learn: "Future",
      img: "/img/skills_img/logo-express.svg",
      alt: "logo express",
      class: "color-white-filter",
    },
    {
      title: "Mongodb",
      learn: "Future",
      img: "/img/skills_img/logo-mongo.svg",
      alt: "logo mongodb",
    },
    {
      title: "TypeScript",
      learn: "Future",
      img: "/img/skills_img/logo-typescript.svg",
      alt: "logo typescript",
    },
    {
      title: "Next.js",
      learn: "Future",
      img: "/img/skills_img/logo-nextjs.svg",
      alt: "logo next",
      class: "color-white-filter",
    },
    {
      title: "Nest.js",
      learn: "Future",
      img: "/img/skills_img/logo-nestjs.svg",
      alt: "logo nest",
    },
    {
      title: "Tailwind",
      learn: "Future",
      img: "/img/skills_img/logo-tailwind.svg",
      alt: "logo tailwind",
    },
    {
      title: "Bootstrap",
      learn: "Future",
      img: "/img/skills_img/logo-bootstrap.svg",
      alt: "logo bootstrap",
    },
    {
      title: "Babel",
      learn: "Future",
      img: "/img/skills_img/logo-babel.svg",
      alt: "logo babel",
    },
    {
      title: "Gulp",
      learn: "Future",
      img: "/img/skills_img/logo-gulp.svg",
      alt: "logo gulp",
    },
  ];

  const html = function (body) {
    return `<div class="knowledge__container__box post-view">
    <img
      src="${body.img}"
      alt="${body.alt}"
      class="knowledge__container__box--logo  ${body.class}"
    /><span class="knowledge__container__box--lang">
      <span class="color-text">${body.title}</span></span
    ><span class="knowledge__container__box--learn">${body.learn}</span>
  </div>`;
  };

  const changeContent = function (event, test, remove, add) {
    event.target.textContent = test;
    event.target.classList.remove(remove);
    event.target.classList.add(add);
  };

  btnSkills.addEventListener("click", function (e) {
    const boxes = [...document.querySelectorAll(".post-view")];
    e.preventDefault();

    if (e.target.classList.contains("expand")) {
      data.forEach((entry) => {
        container.insertAdjacentHTML("beforeend", html(entry));
      });
      changeContent(e, "Less Knowledge", "expand", "collapse");
    } else if (e.target.classList.contains("collapse")) {
      boxes.forEach((entry) => entry.remove());
      changeContent(e, "More Knowledge", "collapse", "expand");
    }
  });
}

///Slider
function slider() {
  const prev = document.querySelector(".slider__buttons--left");
  const next = document.querySelector(".slider__buttons--right");
  const slides = [...document.querySelectorAll(".slider__content")];
  let activeSlide = 0;

  const setActiveSlide = function () {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[activeSlide].classList.add("active");
  };

  next.addEventListener("click", function (e) {
    activeSlide++;
    if (activeSlide > slides.length - 1) activeSlide = 0;

    setActiveSlide();
  });

  prev.addEventListener("click", function (e) {
    activeSlide--;
    if (activeSlide < 0) activeSlide = slides.length - 1;

    setActiveSlide();
  });
}

///Animation section
function animateSection() {
  const sections = [...document.querySelectorAll(".section")];

  const callback = (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.15,
  });

  sections.forEach((section) => observer.observe(section));
}

init();
