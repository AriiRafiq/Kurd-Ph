const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');

    // Toggle side menu
    menuButton.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
		menuButton.classList.toggle('clicked');
    });

	// Close side-menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (event.target !== sideMenu && !sideMenu.contains(event.target) && event.target !== menuButton) {
            sideMenu.classList.remove('open');
            menuButton.classList.remove('clicked');
        }
    });