console.log(`D3.js version %c${d3.version}`, "color:#a980c4; font-weight:bold;");

function scrollToCarousel() {
	const carousel = document.getElementById('carousel');
	carousel.scrollIntoView();
}


document.querySelectorAll('.carousel-nav-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Empêche la propagation vers le scroll vertical
        
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    });
});