async function loadPartial(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Ошибка загрузки ${file}: ${response.status}`);
        document.getElementById(id).innerHTML = await response.text();
    } catch (err) {
        console.error(err);
    }
}

loadPartial('header', '/partials/header.html');
loadPartial('footer', '/partials/footer.html');

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
let index = 0;

function updateCarousel() {
    track.style.transform = `translateX(${-100 * index}vw)`; // слайд на всю ширину
}

// Автопрокрутка каждые N секунды
let interval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
}, 4000);

// Кнопка вперед
nextButton.addEventListener('click', () => {
    clearInterval(interval); // останавливаем авто, если нажали
    index = (index + 1) % slides.length;
    updateCarousel();
});

// Кнопка назад
prevButton.addEventListener('click', () => {
    clearInterval(interval);
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
});

