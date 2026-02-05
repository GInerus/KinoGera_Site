console.log('promotions.js загружен');

fetch('/data/promotions.json')
  .then(res => res.json())
  .then(promotions => {
    const track = document.getElementById('promotions-track');
    if (!track) return;

    promotions.forEach(promo => {
      const card = document.createElement('div');
      card.className = 'promo-card';
      card.innerHTML = `
        <img src="${promo.image}" alt="${promo.title}">
      `;
      track.appendChild(card);
    });
  })
  .catch(err => console.error('Ошибка загрузки promotions.json', err));
