// API
const API_KEY = `api_key=bc5f4bbc2ab1bb5f4b603fe6d312ce25`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader-hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  getMovies();
  slide();
});

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    createMoives(data.results);
  } catch (err) {
    console.error(err);
  }
}
const createMoives = (movies) => {
  const carouselGroup = document.querySelector(".carousel-group-item");
  movies.map((movie) => {
    const templateDiv = `<div class="carousel-item">
                    <img src="${
                      IMG_URL + movie.poster_path
                    }" class="carousel-img-responsive">
                     </div>`;
    carouselGroup.innerHTML += templateDiv;
  });
};

// function : Toggle Theme (dark mode and light mode)
const btnToggleMode = document.querySelector(".btn-toggle-theme");
const iconToggleMode = document.querySelector(".btn-toggle-theme i");

const toggleTheme = () => {
  const body = document.body;
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    iconToggleMode.classList.remove("fa-moon");
    iconToggleMode.classList.add("fa-sun");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    iconToggleMode.classList.add("fa-moon");
    iconToggleMode.classList.remove("fa-sun");
  }
};

// Event
btnToggleMode.addEventListener("click", toggleTheme);

// function : input search
const btnSearch = document.querySelector(".btn-search");
const btnSearchIcon = document.querySelector(".btn-search i.fas");
const inputSearch = document.querySelector(".input-search-movies");

const searchInput = () => {
  if (!btnSearch.classList.contains("search-active")) {
    inputSearch.classList.toggle("search-active");
    btnSearch.classList.toggle("search-icon-active");
    btnSearchIcon.classList.toggle("icon-active");
    inputSearch.focus();
    inputSearch.value = "";
  } else {
  }
};

// Event
btnSearch.addEventListener("click", searchInput);

// function : carousel

const slide = () => {
  const btnSlide = document.querySelectorAll(".btn");
  const movieItem = document.querySelectorAll('.carousel-item');

  btnSlide.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("btn-left")) {
        console.log("slide left!");
      } else if (e.currentTarget.classList.contains("btn-right")) {
        console.log("slide right!");
      }
    });
  });
};
