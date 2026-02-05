console.log('today.js загружен');

const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });

Promise.all([
  fetch('/data/movies.json').then(r => r.json()),
  fetch('/data/schedule.json').then(r => r.json())
])
.then(([movies, schedule]) => {
  const container = document.getElementById('today-movies');
  if (!container) return;

  // нормализуем день недели (понедельник → Понедельник)
  const todayNormalized =
    today.charAt(0).toUpperCase() + today.slice(1);

  // берём только записи на сегодня
  const todaySchedule = schedule.filter(
    item => item.day === todayNormalized
  );

  if (todaySchedule.length === 0) {
    container.innerHTML = '<p>Сегодня сеансов нет 😢</p>';
    return;
  }

  todaySchedule.forEach(entry => {
    const movie = movies.find(m => m.id === entry.movieId);
    if (!movie) return;

    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <div class="times">
        ${entry.times.map(t => `<span>${t}</span>`).join('')}
      </div>
    `;

    container.appendChild(card);
  });
})
.catch(err => {
  console.error('Ошибка загрузки данных', err);
});
