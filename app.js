// API
const API_KEY = `api_key=bc5f4bbc2ab1bb5f4b603fe6d312ce25`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;

const API_QUERY = `${BASE_URL}/search/movie?${API_KEY}&query=`;
const gridMovies = document.querySelector(".grid-movie-container");

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader-hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  getMovies(API_URL);
});

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createMoives(data.results);
    console.log(url);
  } catch (err) {
    console.error(err);
  }
}

const createMoives = (movies) => {
  if (movies.length === 0) {
    gridMovies.innerHTML = "";
    gridMovies.classList.add("not-found");
    gridMovies.innerHTML = `<h1 class="text-not-found">Not Found !!</h1>`;
  } else {
    gridMovies.classList.remove("not-found");
    gridMovies.innerHTML = "";

    movies.map((movie) => {
      const { poster_path } = movie;

      const div = document.createElement("div");
      div.classList.add("grid-item");

      const img = document.createElement("img");
      img.classList.add("grid-img-responsive");
      img.src = IMG_URL + poster_path;

      div.appendChild(img);
      gridMovies.appendChild(div);
    });
  }
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
  }
};

// Event
btnSearch.addEventListener("click", searchInput);

const searchMoives = document.querySelector("#form-search-movies");

searchMoives.addEventListener("submit", () => {
  const searchValue = document.querySelector(".input-search-movies").value;

  if (searchValue) {
    getMovies(API_QUERY + searchValue);
  } else {
    getMovies(API_URL);
  }
});
