document.addEventListener('DOMContentLoaded', () => {
    const ageBox = document.getElementById('ageBox');
    const weightBox = document.getElementById('weightBox');
    const calculateButton = document.getElementById('calculateButton');
    const medicationList = document.getElementById('medicationList');
    const doseList = document.getElementById('doseList');
    const calculateButton1 = document.getElementById('calculateButton1');
    const resultLabel1 = document.getElementById('resultLabel1');
    const frequencyLabel = document.getElementById('frequencyLabel');
    const disclaimerIcon = document.getElementById('disclaimerIcon');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
	const settingsIcon = document.getElementById('settingsIcon');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const medicationSettings = document.getElementById('medicationSettings');
	const defaultValuesBtn = document.getElementById('defaultValuesBtn');

    const medicationValues = {
        "Paracetamol": 12.5,
        "Ibuprofen": 8.0,
        "Mefenamic Acid": 8.0,
        "Amoxicillin": 17.0,
        "Amoxiclav": 25.0,
        "Azithromycin": 12.0,
        "Bactrim": 12.0,
        "Cefalexin": 12.5,
        "Cefdinir": 7.0,
        "Cefixime": 8.0,
        "Cefpodoxime": 10.0,
        "Metronidazole": 7.5,
        "Nitrofurantoin": 1.0,
        "Domperidone": 0.3,
        "Hyoscine": 0.5,
        "Ondansetron": 0.15
    };

    const medicationFrequencies = {
        "Paracetamol": "1*3",
        "Ibuprofen": "1*3",
        "Mefenamic Acid": "1*3",
        "Amoxicillin": "1*3",
        "Amoxiclav": "1*2",
        "Azithromycin": "1*1",
        "Bactrim": "1*2",
        "Cefalexin": "1*2",
        "Cefdinir": "1*2",
        "Cefixime": "1*1",
        "Cefpodoxime": "1*2",
        "Metronidazole": "1*3",
        "Nitrofurantoin": "1*4",
        "Domperidone": "1*3",
        "Hyoscine": "1*3",
        "Ondansetron": "1*1"
    };

    const medicationDoses = {
        "Paracetamol": ["100 mg/1 ml", "125 mg/5 ml", "250 mg/5 ml"],
        "Ibuprofen": ["100 mg/5 ml", "200 mg/5 ml"],
        "Mefenamic Acid": ["50 mg/5 ml"],
        "Amoxicillin": ["125 mg/5 ml", "250 mg/5 ml"],
        "Amoxiclav": ["156 mg/5 ml", "200 mg/5 ml", "312 mg/5 ml", "457 mg/5 ml"],
        "Azithromycin": ["100 mg/5 ml", "200 mg/5 ml", "300 mg/7.5 ml"],
        "Bactrim": ["240 mg/5 ml", "480 mg/5 ml"],
        "Cefalexin": ["125 mg/5 ml", "250 mg/5 ml"],
        "Cefdinir": ["125 mg/5 ml", "250 mg/5 ml"],
        "Cefixime": ["50 mg/5 ml", "100 mg/5 ml"],
        "Cefpodoxime": ["50 mg/5 ml", "100 mg/5 ml"],
        "Metronidazole": ["25 mg/5 ml", "125 mg/5 ml", "200 mg/5 ml"],
        "Nitrofurantoin": ["25 mg/5 ml", "50 mg/5 ml"],
        "Domperidone": ["5 mg/5 ml"],
        "Hyoscine": ["5 mg/5 ml"],
        "Ondansetron": ["4 mg/5 ml"]
    };
	
	const savedMedicationValues = localStorage.getItem('medicationValues');
	if (savedMedicationValues) {
        Object.assign(medicationValues, JSON.parse(savedMedicationValues));
        console.log('Loaded medication values from localStorage:', medicationValues);
    }

    medicationList.addEventListener('focus', () => {
        if (medicationList.options.length === 1) { // Only the initial empty option exists
            Object.keys(medicationValues).forEach(medication => {
                const option = document.createElement('option');
                option.value = medication;
                option.textContent = medication;
                medicationList.appendChild(option);
            });
        }
    });

    medicationList.addEventListener('change', () => {
        doseList.innerHTML = '<option value="" selected disabled hidden></option>'; // Reset doseList
        resultLabel1.textContent = '';
        frequencyLabel.textContent = '';
        const selectedMedication = medicationList.value;
        if (selectedMedication) {
            medicationDoses[selectedMedication].forEach(dose => {
                const option = document.createElement('option');
                option.value = dose;
                option.textContent = dose;
                doseList.appendChild(option);
            });
        }
		addBounceAnimation(doseList);
    });

    calculateButton.addEventListener('click', () => {
        const age = parseInt(ageBox.value);
        if (isNaN(age)) {
			addBounceAnimation(ageBox);
        } else {
            const weight = (age * 2) + 8;
            weightBox.value = weight;
			addBounceAnimation(medicationList);
        }
    });

    ageBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateButton.click();
        }
    });

    calculateButton1.addEventListener('click', () => {
        const selectedMedication = medicationList.value;
        const selectedDose = doseList.value;
        const weight = parseFloat(weightBox.value);

        if (!selectedMedication) {
            resultLabel1.textContent = 'Please select a medication!';
			addBounceAnimation(medicationList);
            return;
        }

        if (!selectedDose) {
            resultLabel1.textContent = 'Please select a dose!';
			addBounceAnimation(doseList);
            return;
        }

        if (isNaN(weight)) {
            resultLabel1.textContent = 'Please enter a valid weight!';
			addBounceAnimation(weightBox);
            return;
        }

        try {
            const [doseMg, doseMl] = selectedDose.split(' mg/').map(d => parseFloat(d));
            const medicationValue = medicationValues[selectedMedication];
            const result = (weight * medicationValue) / doseMg * doseMl;
            resultLabel1.textContent = `Dose: ${result.toFixed(2)} ml`;
            frequencyLabel.textContent = `Frequency: ${medicationFrequencies[selectedMedication]}`;
        } catch (error) {
            resultLabel1.textContent = 'Invalid dose format!';
        }
    });


	disclaimerIcon.addEventListener('click', () => {
		disclaimerModal.style.display = 'flex'; // Make sure it's shown
	});

	closeModalBtn.addEventListener('click', () => {
		disclaimerModal.style.display = 'none'; // Hide the modal
	});

    // Add event listener to close the modal when clicking outside of it
   	 window.addEventListener('click', (event) => {
      	  if (event.target === disclaimerModal) {
           	 disclaimerModal.style.display = 'none';
       		 }
  	  });

     // Settings icon

    settingsIcon.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
        loadMedicationSettings();
    });

    closeSettingsModalBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', () => {
        saveMedicationSettings();
        settingsModal.style.display = 'none';
    });
	
	// Add event listener to close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    function loadMedicationSettings() {
        medicationSettings.innerHTML = `
            <div class="medication-header">
                <span>Medication</span>
                <span>Value (mg/kg)</span>
            </div>
        `;
        for (let medication in medicationValues) {
            const div = document.createElement('div');
            div.classList.add('medication-setting');
            div.innerHTML = `
                <label>${medication}</label>
                <input type="number" value="${medicationValues[medication]}" data-medication="${medication}">
            `;
            medicationSettings.appendChild(div);
        }
    }

    function saveMedicationSettings() {
        const inputs = medicationSettings.querySelectorAll('input');
        inputs.forEach(input => {
            const medication = input.dataset.medication;
            const value = parseFloat(input.value);
            if (!isNaN(value) && value > 0) {
                medicationValues[medication] = value;
            }
        });
        localStorage.setItem('medicationValues', JSON.stringify(medicationValues));
		console.log('Medication values saved:', medicationValues);
    }

    defaultValuesBtn.addEventListener('click', () => {
        resetMedicationValuesToDefault();
    });

    function resetMedicationValuesToDefault() {
        const defaultMedicationValues = {
        "Paracetamol": 12.5,
        "Ibuprofen": 8.0,
        "Mefenamic Acid": 8.0,
        "Amoxicillin": 17.0,
        "Amoxiclav": 25.0,
        "Azithromycin": 12.0,
        "Bactrim": 12.0,
        "Cefalexin": 12.5,
        "Cefdinir": 7.0,
        "Cefixime": 8.0,
        "Cefpodoxime": 10.0,
        "Metronidazole": 7.5,
        "Nitrofurantoin": 1.0,
        "Domperidone": 0.3,
        "Hyoscine": 0.5,
        "Ondansetron": 0.15
    };

        Object.assign(medicationValues, defaultMedicationValues);
        localStorage.setItem('medicationValues', JSON.stringify(medicationValues));
        loadMedicationSettings();
        console.log('Medication values reset to default:', medicationValues);
    }
	
    title.addEventListener('click', () => {
        resetFields();
    });

    function resetFields() {
        ageBox.value = '';
        weightBox.value = '';
        resultLabel1.textContent = '';
        frequencyLabel.textContent = '';
        medicationList.selectedIndex = 0; // Reset to default option
        doseList.innerHTML = '<option value="" selected disabled hidden>Select Dose</option>'; // Reset dose list
    }

function addBounceAnimation(element) {
    element.classList.add('bounce');
    element.addEventListener('animationend', function() {
        element.classList.remove('bounce');
    }, { once: true });
}

});
