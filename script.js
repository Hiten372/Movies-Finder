document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const movieForm = document.getElementById("movieForm");
  const movieInput = document.getElementById("movieInput");
  const movieResults = document.getElementById("movieResults");

  // API URL
  const API_URL = "https://www.omdbapi.com/?apikey=dff20f4e&s=";

  // Handle Form Submit
  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const movieName = movieInput.value.trim();

    if (!movieName) {
      showError("Please enter a movie name");
      return;
    }

    searchMovies(movieName);
  });

  // Fetch Movies
  async function searchMovies(movieName) {
    showLoading();

    try {
      const response = await fetch(`${API_URL}${movieName}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      displayMovies(data.Search);
    } catch (error) {
      showError(error.message);
    }
  }

  // Display Loading
  function showLoading() {
    movieResults.innerHTML = `
      <div class="loading">
        Searching movies...
      </div>
    `;
  }

  // Display Error
  function showError(message) {
    movieResults.innerHTML = `
      <div class="error-message">
        ${message}
      </div>
    `;
  }

  // Display Movies
  function displayMovies(movies) {
    const moviesHTML = movies
      .map(
        (movie) => `
        <div class="movie-card">

          <img
            src="${
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }"
            alt="${movie.Title}"
            class="movie-poster"
          />

          <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>

            <div class="movie-year">
              ${movie.Year}
            </div>

            <div class="movie-type">
              ${movie.Type}
            </div>
          </div>

        </div>
      `,
      )
      .join("");

    movieResults.innerHTML = `
      <div class="movies-grid">
        ${moviesHTML}
      </div>
    `;
  }
});
