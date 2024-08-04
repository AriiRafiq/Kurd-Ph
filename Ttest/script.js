document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    const ageBox = document.getElementById('ageBox');
    const weightBox = document.getElementById('weightBox');
    const vitBox = document.getElementById('vitBox');
    const resultLabel = document.getElementById('resultLabel');
    const dayResultLabel = document.getElementById('dayResultLabel');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Calculate dose
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
    disclaimerModal.addEventListener('click', function() {
        disclaimerModal.style.display = 'block';
    });

    // Close disclaimer modal
    closeModalBtn.addEventListener('click', function() {
        disclaimerModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === disclaimerModal) {
            disclaimerModal.style.display = 'none';
        }
    });
});
