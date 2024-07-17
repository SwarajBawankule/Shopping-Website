// Add event listeners to navbar links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const href = link.getAttribute('href');
        const page = document.querySelector(href);
        page.scrollIntoView();
    });
});
