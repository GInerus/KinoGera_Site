async function loadPartial(id, file) {
const response = await fetch(file);
document.getElementById(id).innerHTML = await response.text();
}


loadPartial('header', './partials/header.html');
loadPartial('footer', './partials/footer.html');
