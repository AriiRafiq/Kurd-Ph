document.addEventListener('DOMContentLoaded', function() {
    const ageBox = document.getElementById('ageBox');
    const weightBox = document.getElementById('weightBox');
    const vitBox = document.getElementById('vitBox');
    const calculateButton = document.getElementById('calculateButton');
    const resultLabel = document.getElementById('resultLabel');
    const dayResultLabel = document.getElementById('dayResultLabel');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const disclaimerButton = document.getElementById('disclaimerButton');
    const menuButton = document.getElementById('menu-button');
    const sideMenu = document.getElementById('side-menu');
    const title = document.getElementById('title');

    // Alert message on page load
    alert("Please note that this page is still under work");

    // Focus on the next input box when Enter is pressed
    ageBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            weightBox.focus();
	    addBounceAnimation(weightBox);
        }
    });

    weightBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            vitBox.focus();
	    addBounceAnimation(vitBox);
        }
    });

    vitBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateButton.click(); // Trigger the calculate button
        }
    });

    // Calculate dose when the button is clicked
    calculateButton.addEventListener('click', function() {
        const age = parseFloat(ageBox.value);
        const weight = parseFloat(weightBox.value);
        const vitDLevel = parseFloat(vitBox.value);

        if (!isNaN(age) && !isNaN(weight) && !isNaN(vitDLevel)) {
            const dose = (75 - vitDLevel) * age * weight;
            const dailyDose = dose / 30;
            resultLabel.textContent = `Calculated Dose: ${dose.toFixed(2)} IU`;
            dayResultLabel.textContent = `Daily Dose: ${dailyDose.toFixed(2)} IU per day`;
        } else {
            resultLabel.textContent = 'Please enter valid values for all fields.';
            dayResultLabel.textContent = '';
        }
    });

    // Show disclaimer modal
    disclaimerButton.addEventListener('click', function() {
        disclaimerModal.style.display = 'block';
        sideMenu.classList.remove('open');
    });

    // Close disclaimer modal
    closeModalBtn.addEventListener('click', function() {
        disclaimerModal.style.display = 'none';
    });

    // Toggle side menu
    menuButton.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
	menuButton.classList.toggle('clicked');
    });

    // Close modal if user clicks outside of it
    document.addEventListener('click', function(event) {
        if (event.target === disclaimerModal) {
        disclaimerModal.style.display = 'none';
        }
    });
	
	title.addEventListener('click', () => {
        resetFields();
    });

    function resetFields() {
        ageBox.value = '';
        weightBox.value = '';
	vitBox.value = '';
        resultLabel.textContent = '';
        dayResultLabel.textContent = '';
    }
	
	function addBounceAnimation(element) {
	element.classList.add('bounce');
	element.addEventListener('animationend', function() {
        element.classList.remove('bounce');
	}, { once: true });
    }
	
	// Close side-menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (event.target !== sideMenu && !sideMenu.contains(event.target) && event.target !== menuButton) {
            sideMenu.classList.remove('open');
            menuButton.classList.remove('clicked');
        }
    });
	
});
