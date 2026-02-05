console.log('movie.js загружен');

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

fetch('/data/movies.json')
  .then(res => res.json())
  .then(movies => {
    const container = document.getElementById('movie');

    if (!container) return;

    // Ищем фильм по id (строка!)
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
      container.innerHTML = '<h2>Фильм не найден</h2>';
      return;
    }

    container.innerHTML = `
      <h1>${movie.title}</h1>
      <img src="${movie.poster}" alt="${movie.title}">
      <p><strong>Год:</strong> ${movie.year}</p>
      <p><strong>Жанр:</strong> ${movie.genre || '-'}</p>
      <p>${movie.description || 'Описание отсутствует'}</p>
      <p>⭐ ${movie.rating || '-'}</p>
      <a href="/pages/movies/index.html" style="color:#0af;">← Назад к списку</a>
    `;
  })
  .catch(err => {
    console.error('Ошибка загрузки movies.json', err);
  });