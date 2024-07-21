document.addEventListener('DOMContentLoaded', () => {
    const ageBox = document.getElementById('ageBox');
    const weightBox = document.getElementById('weightBox');
    const calculateButton = document.getElementById('calculateButton');
    const resultLabel = document.getElementById('resultLabel');
    const medicationList = document.getElementById('medicationList');
    const doseList = document.getElementById('doseList');
    const calculateButton1 = document.getElementById('calculateButton1');
    const resultLabel1 = document.getElementById('resultLabel1');
    const frequencyLabel = document.getElementById('frequencyLabel');

    const medicationValues = {
        "Paracetamol": 12.5,
        "Ibuprofen": 8.0,
        "Mefenamic Acid": 8.0,
        "Amoxicillin": 17.0,
        "Amoxiclav": 25.0,
        "Azithromycin": 12.0,
        "Metronidazole": 7.5,
        "Cefixime": 8.0,
        "Cefdinir": 7.0,
        "Cefalexin": 12.5,
        "Nitrofurantoin": 1.0,
        "Bactrim": 12.0,
        "Cefpodoxime": 10.0,
        "Hyoscine": 0.5,
        "Ondansetron": 0.15,
        "Domperidone": 0.3
    };

    const medicationFrequencies = {
        "Paracetamol": "1*3",
        "Ibuprofen": "1*3",
        "Mefenamic Acid": "1*3",
        "Amoxicillin": "1*3",
        "Amoxiclav": "1*2",
        "Azithromycin": "1*1",
        "Metronidazole": "1*3",
        "Cefixime": "1*1",
        "Cefdinir": "1*2",
        "Cefalexin": "1*2",
        "Nitrofurantoin": "1*4",
        "Bactrim": "1*2",
        "Cefpodoxime": "1*2",
        "Hyoscine": "1*3",
        "Ondansetron": "1*1",
        "Domperidone": "1*3"
    };

    const medicationDoses = {
        "Paracetamol": ["100 mg/1 ml", "125 mg/5 ml", "250 mg/5 ml"],
        "Ibuprofen": ["100 mg/5 ml", "200 mg/5 ml"],
        "Mefenamic Acid": ["50 mg/5 ml"],
        "Amoxicillin": ["125 mg/5 ml", "250 mg/5 ml"],
        "Amoxiclav": ["156 mg/5 ml", "200 mg/5 ml", "312 mg/5 ml", "457 mg/5 ml"],
        "Azithromycin": ["100 mg/5 ml", "200 mg/5 ml", "300 mg/7.5 ml"],
        "Metronidazole": ["25 mg/5 ml", "125 mg/5 ml", "200 mg/5 ml"],
        "Cefixime": ["50 mg/5 ml", "100 mg/5 ml"],
        "Cefdinir": ["125 mg/5 ml", "250 mg/5 ml"],
        "Cefalexin": ["125 mg/5 ml", "250 mg/5 ml"],
        "Nitrofurantoin": ["25 mg/5 ml", "50 mg/5 ml"],
        "Bactrim": ["240 mg/5 ml", "480 mg/5 ml"],
        "Cefpodoxime": ["50 mg/5 ml", "100 mg/5 ml"],
        "Hyoscine": ["5 mg/5 ml"],
        "Ondansetron": ["4 mg/5 ml"],
        "Domperidone": ["5 mg/5 ml"]
    };

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
    });

    calculateButton.addEventListener('click', () => {
        const age = parseInt(ageBox.value);
        if (isNaN(age)) {
            resultLabel.textContent = 'Invalid age input!';
        } else {
            const weight = (age * 2) + 8;
            weightBox.value = weight;
            resultLabel.textContent = `Weight: ${weight} Kg`;
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
            return;
        }

        if (!selectedDose) {
            resultLabel1.textContent = 'Please select a dose!';
            return;
        }

        if (isNaN(weight)) {
            resultLabel1.textContent = 'Please enter a valid weight!';
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
});
