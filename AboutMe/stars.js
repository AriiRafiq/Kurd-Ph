// Add this to initialize and resize the canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(); // Reinitialize stars on window resize
});

// Remove the previous code related to canvas stars and add the following for creating star elements
const starContainer = document.querySelector('.stars');

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 4 + 3}s`;
    starContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 9000);
}

setInterval(createStar, 200);