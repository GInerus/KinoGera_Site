console.log('movies.js загружен');

const MOVIES_URL = '/data/movies.json';

fetch(MOVIES_URL)
  .then(res => res.json())
  .then(movies => {
    // Страница списка фильмов
    const listContainer = document.getElementById('movies');
    if (listContainer) {
      renderMoviesList(movies, listContainer);
    }

    // Страница одного фильма
    const movieContainer = document.getElementById('movie');
    if (movieContainer) {
      renderSingleMovie(movies, movieContainer);
    }
  })
  .catch(err => {
    console.error('Ошибка загрузки movies.json', err);
  });

function renderMoviesList(movies, container) {
  movies.forEach(movie => {
    const card = document.createElement('a');
    card.className = 'movie';
    card.href = `/pages/movies/movie.html?id=${movie.id}`;
;

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <span>⭐ ${movie.rating}</span>
    `;

    container.appendChild(card);
  });
}

function renderSingleMovie(movies, container) {
  const params = new URLSearchParams(window.location.search);
  const movieId = Number(params.get('id'));

const movie = movies.find(m => Number(m.id) === movieId);

  if (!movie) {
    container.innerHTML = '<h2>Фильм не найден</h2>';
    return;
  }

  container.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="${movie.poster}" alt="${movie.title}">
    <p><strong>Год:</strong> ${movie.year}</p>
    <p><strong>Жанр:</strong> ${movie.genre}</p>
    <p>${movie.description}</p>
    <p>⭐ ${movie.rating}</p>
  `;
}
