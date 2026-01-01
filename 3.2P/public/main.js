document.addEventListener("DOMContentLoaded", () => {
  const sidenavElems = document.querySelectorAll(".sidenav");
  if (window.M && M.Sidenav && M.Sidenav.init) {
    M.Sidenav.init(sidenavElems);
  }

  console.log("main.js loaded: initializing page");
  fetchMovies();

  const searchInput = document.getElementById("search");
  const genreSelect = document.getElementById("genre-filter");

  const triggerFilter = () => {
    if (window.allMovies) {
      renderMovieCards(getFilteredMovies(window.allMovies));
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", triggerFilter);
  }
  if (genreSelect) {
    genreSelect.addEventListener("change", triggerFilter);
  }

  const cardsContainer = document.getElementById("movie-cards");
  if (cardsContainer) {
    cardsContainer.addEventListener("click", (e) => {
      const card = e.target.closest(".flip-card");
      if (card) {
        card.classList.toggle("is-flipped");
      }
    });
  }
});

function fetchMovies() {
  fetch("/api/movies")
    .then((response) => response.json())
    .then((data) => {
      console.log("/api/movies response count:", Array.isArray(data) ? data.length : "non-array");
      window.allMovies = data;
      renderMovieCards(getFilteredMovies(data));
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      const container = document.getElementById("movie-cards");
      if (container) {
        container.innerHTML =
          '<div class="col s12"><div class="card-panel red darken-2 white-text">Failed to load movies. Is the server running on http://localhost:3000?</div></div>';
      }
    });
}

function getFilteredMovies(movies) {
  const searchInput = document.getElementById("search");
  const genreSelect = document.getElementById("genre-filter");
  const q = ((searchInput && searchInput.value) || "").trim().toLowerCase();
  const genre = (genreSelect && genreSelect.value) || "";

  return (movies || []).filter((movie) => {
    const title = (movie.title || "").toLowerCase();
    const movieGenre = Array.isArray(movie.genre)
      ? movie.genre.join(",")
      : (movie.genre || "");
    const matchesTitle = q ? title.includes(q) : true;
    const matchesGenre = genre ? movieGenre.includes(genre) : true;
    return matchesTitle && matchesGenre;
  });
}

function renderMovieCards(movies) {
  const container = document.getElementById("movie-cards");
  if (!container) return;

  if (!movies || movies.length === 0) {
    container.innerHTML = '<div class="col s12"><div class="card-panel grey lighten-3">No movies found.</div></div>';
    return;
  }

  container.innerHTML = movies
    .map((movie) => {
      const title = movie.title || "Untitled";
      const img = movie.imageUrl || movie.poster || "";
      const genre = Array.isArray(movie.genre)
        ? movie.genre.join(", ")
        : (movie.genre || "");
      const year = movie.year || "";
      const rating = movie.rating != null ? movie.rating : "";
      return `
      <div class="col s12 m6 l3">
        <div class="card hoverable movie-card flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front card-image">
              ${img ? `<img src="${img}" alt="${title}">` : ""}
              <span class="card-title gradient-overlay">${title}</span>
            </div>
            <div class="flip-card-back card-content">
              <p class="movie-meta">
                ${year ? `<span class="chip grey darken-3 white-text">${year}</span>` : ""}
                ${rating !== "" ? `<span class="chip deep-orange accent-3 white-text">${rating} ★</span>` : ""}
              </p>
              ${genre ? `<p class="movie-genre">${genre}</p>` : ""}
              ${movie.description ? `<p class="movie-description">${movie.description}</p>` : ""}
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}
// legacy block removed
