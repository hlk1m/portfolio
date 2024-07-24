"use strict";

// Scroll to section
function onScrollToElement(id) {
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });

  // Mobile toggle menu
  const menu = document.querySelector(".navbar_menu");
  if (!menu.classList.contains("nav_hidden")) {
    menu.classList.add("nav_hidden");
  }
}

// Main image hover event - Toggle Detail page
let detailTimeout;
function onWorkCardHover(isHover) {
  const loadingIcon = document.querySelector(".loading_icon");
  const cardImg = document.querySelector(".card_img");
  const detailPage = document.querySelector(".detail");

  if (!isHover) {
    clearTimeout(detailTimeout);
    loadingIcon.classList.add("hidden");
    cardImg.classList.remove("hover");
    return;
  }

  cardImg.classList.add("hover");
  loadingIcon.classList.remove("hidden");

  detailTimeout = setTimeout(() => {
    detailPage.classList.remove("hidden");
  }, 2200);
}

// Make Work, Detail Content
function makeWorkCardContent(data) {
  const description = data.description;
  return `
        <figure class="card_main">
            <img
              src="assets/works/mockup/${data.type}_m.jpg"
              alt="work thumbnail"
              class="card_img"
            />
            <div class="click_btn">click! <i class="fa-solid fa-arrow-up"></i></div>
          </figure>
          <div class="card_content">
            <h5>${data.title}</h5>
            <div class="card_list">
              <span>Tool</span>
              <p>${data.languages}</p>
            </div>
            <div class="card_list">
              <span>참여도</span>
              <p>개인 프로젝트</p>
            </div>
            <div class="card_list">
              <span>주요 기능</span>
              <p>${data.feature}</p>
            </div>
            <div class="card_links">
              <a href="${
                data.url
              }" target="_blank" class="card_link_btn">웹사이트</a>
              <a href="${
                data.github
              }" target="_blank" class="card_link_btn">Github</a>
            <button class="card_link_btn card_detail_btn hidden">자세히 보기</button>
            </div>
            <button class="card_more">
              상세 설명 더보기 <i class="fa-solid fa-chevron-down"></i>
            </button>
            <p class="card_description hidden">
            ${
              description.length > 150
                ? description.slice(0, 150) + "..."
                : description
            }
            </p>
          </div>         
`;
}

function makeDetailPage(data) {
  const image = data.imageNum;
  const imageArray = Array(image).fill(0); // make array - length, to fill

  return `
        <div class="detail_heading">
          <h1 class="detail_title">${data.title}</h1>
          <button class="detail_close_btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul class="detail_content">
          <li class="detail_list">
            <span>Tool</span>
            <p>${data.languages}</p>
          </li>
          <li class="detail_list">
            <span>참여도</span>
            <p>개인 프로젝트</p>
          </li>
          <li class="detail_list">
            <span>주요 기능</span>
            <p>${data.feature}</p>
          </li>
          <li class="detail_list">
            <span>Links</span>
            <a href="${
              data.url
            }" target="_blank" class="card_link_btn">웹사이트</a>
            <a href="${
              data.github
            }" target="_blank" class="card_link_btn">Github</a>
          </li>
        </ul>
        <div class="detail_description">
          <h2 class="detail_subtitle">Description</h2>
          <p>${data.description}</p>
        </div>
        <figure class="detail_img">
          <h2 class="detail_subtitle">details</h2>
          ${imageArray.map(
            (_, index) =>
              `<img src="assets/works/${data.type}_${index + 1}.jpg" />`
          )}
        </figure>
  `;
}

export {
  onWorkCardHover,
  onScrollToElement,
  makeWorkCardContent,
  makeDetailPage,
};
