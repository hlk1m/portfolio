"use strict";
import {
  onScrollToElement,
  onWorkCardHover,
  makeWorkCardContent,
  makeDetailPage,
} from "./utils.js";

let fetchData = [];

document.addEventListener("DOMContentLoaded", () => {
  // Work 데이터 가져오기 및 출력
  fetch("./data/data.json")
    .then((res) => res.json())
    .then((json) => {
      fetchData = json.project;
      printWorkCard(fetchData);
    })
    .catch((error) => console.log(error));

  // 화면에 요소가 나타나면 애니메이션을 실행함.
  const elements = document.querySelectorAll('[data-animate="true"]');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animation");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    {
      threshold: 0.5, // Adjust this value as needed
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});

// Scroll Event
const goTopBtn = document.querySelector(".go_top_btn");
const navbar = document.querySelector("#navbar");

document.addEventListener("scroll", () => {
  const home = document.querySelector("#home");
  const homeHeight = home.getBoundingClientRect().top + window.scrollY;
  const aboutHeight =
    document //
      .querySelector("#about")
      .getBoundingClientRect().top + window.scrollY;

  if (aboutHeight * 0.9 < window.scrollY) {
    navbar.classList.add("animation");
    goTopBtn.classList.remove("hidden");
  } else {
    navbar.classList.remove("animation");
    goTopBtn.classList.add("hidden");
  }

  // control home opacity - slowly fade out
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Navbar menu scroll event
document.querySelector(".navbar_menu").addEventListener("click", (e) => {
  const link = e.target.dataset.link;
  if (!link) return;

  onScrollToElement(link);
});

// Navbar toggle button
document
  .querySelector(".navbar_menu_btn")
  .addEventListener("click", () => navbarMenu.classList.toggle("hidden"));

// Go to top button
goTopBtn.addEventListener("click", () => onScrollToElement("#home"));

// Navbar Toggle button
const menu = document.querySelector(".navbar_menu");
document
  .querySelector(".navbar_menu_btn")
  .addEventListener("click", () => menu.classList.toggle("nav_hidden"));

// Work card Buttons
let num = 0;

function onSlideAnimation(isRight) {
  const workCard = document.querySelector(".work_card");
  if (isRight) {
    if (num >= 4) return;

    num++;
    workCard.classList.add("right-animation");
  } else {
    if (num <= 0) return;

    num--;
    workCard.classList.add("left-animation");
  }

  printWorkCard(fetchData);

  setTimeout(() => {
    workCard.className = "work_card";
  }, 1000);
}

document
  .querySelector(".right_btn")
  .addEventListener("click", () => onSlideAnimation(true));

document
  .querySelector(".left_btn")
  .addEventListener("click", () => onSlideAnimation(false));

// Print work card
function printWorkCard(data) {
  const workCard = document.querySelector(".work_card");
  const detailPage = document.querySelector(".detail");

  workCard.innerHTML = makeWorkCardContent(data[num]);
  detailPage.innerHTML = makeDetailPage(data[num]);

  // Toggle More button
  const cardMoreBtn = document.querySelector(".card_more");

  cardMoreBtn.addEventListener("click", () => {
    const description = document.querySelector(".card_description");

    if (description.classList.contains("hidden")) {
      description.classList.remove("hidden");
      cardMoreBtn.innerHTML = `상세 설명 접기 <i class="fa-solid fa-chevron-up"></i>`;
    } else {
      description.classList.add("hidden");
      cardMoreBtn.innerHTML = `상세 설명 더보기 <i class="fa-solid fa-chevron-down"></i>`;
    }
  });

  const mainImg = document.querySelector(".card_main");

  // Work Main img - Open Detail page
  mainImg.addEventListener("click", () =>
    detailPage.classList.toggle("hidden")
  );

  // Work Main image - Hover Event
  mainImg.addEventListener("mouseover", (e) => {
    const pageX = e.pageX;
    const width = window.innerWidth;

    const left = width * 0.15;
    const right = width * 0.6;

    // Main image가 아닌 곳에서 hover event를 적용시키지 않음.
    if (pageX < left || pageX > right) {
      return;
    }

    onWorkCardHover(true);
  });

  mainImg.addEventListener("mouseleave", () => onWorkCardHover(false));

  // Close Detail page
  document.querySelector(".detail_close_btn").addEventListener("click", () => {
    detailPage.classList.toggle("hidden");
    onWorkCardHover(false);
  });

  onWorkCardHover(false);
}
