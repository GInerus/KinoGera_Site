console.log('schedule.js загружен');

Promise.all([
  fetch('/data/movies.json').then(r => r.json()),
  fetch('/data/schedule.json').then(r => r.json())
])
.then(([movies, schedule]) => {
  const container = document.getElementById('schedule');
  if (!container) return;

  const daysMap = {};

  schedule.forEach(item => {
    if (!daysMap[item.day]) {
      daysMap[item.day] = [];
    }

    const movie = movies.find(m => m.id === item.movieId);
    if (!movie) return;

    daysMap[item.day].push({
      movie,
      times: item.times
    });
  });

  for (const day in daysMap) {
    const daySection = document.createElement('section');
    daySection.className = 'schedule-day';

    daySection.innerHTML = `
      <h2 class="schedule-title">${day}</h2>
      <div class="schedule-container">
        <div class="schedule-row"></div>
      </div>
    `;

    const row = daySection.querySelector('.schedule-row');

    daysMap[day].forEach(entry => {
      const card = document.createElement('div');
      card.className = 'schedule-card';

      card.innerHTML = `
        <img src="${entry.movie.poster}" alt="${entry.movie.title}">
        <h3>${entry.movie.title}</h3>
        <div class="times">
          ${entry.times.map(t => `<span>${t}</span>`).join('')}
        </div>
      `;

      row.appendChild(card);
    });

    container.appendChild(daySection);
  }
})
.catch(err => {
  console.error('Ошибка расписания', err);
});
