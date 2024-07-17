// // script.js
// document.querySelector('.burger').addEventListener('click', () => {
//     document.querySelector('.nav-links').classList.toggle('show');
// });
// document.getElementById('home-link').addEventListener('click', function(event) {
//     // Prevent the default action to avoid navigating immediately
//     event.preventDefault();
    
//     // Redirect to the Home page
//     window.location.href = 'http://example.com/home'; // Replace 'http://example.com/home' with the actual URL of your Home page
// });
// window.onload = function() {
//     var messageDiv = document.getElementById('welcome-message');
//     messageDiv.innerHTML = 'Welcome to the Home Page!';
// };


// document.querySelectorAll('.page-link').forEach(link => {
//     link.addEventListener('click', function(event) {
//         event.preventDefault();
//         window.location.hash = this.getAttribute('href');
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav__link');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    navLinks.addEventListener('click', function() {
        navLinks.classList.remove('show');
    });

    // Hide the menu when the screen is resized to a larger size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            navLinks.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1); // Remove '#' from the href
            window.location.hash = targetId; // Update URL hash
            contentDiv.innerHTML = `<h2>Welcome to ${targetId}</h2>`; // Display welcome message
        });
    });

    // Initial load
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash.slice(1);
        contentDiv.innerHTML = `<h2>Welcome to ${currentHash}</h2>`;
    });
});