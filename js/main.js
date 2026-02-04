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
