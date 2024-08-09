// Initialize exchange rates
let exchangeRates = {
    sarToIqd: parseFloat(localStorage.getItem('sarToIqd')) || 398.15,
    sarToUsd: parseFloat(localStorage.getItem('sarToUsd')) || 0.26,
    iqdToUsd: parseFloat(localStorage.getItem('iqdToUsd')) || 0.000666222518321,
};

const sarInput = document.getElementById('sar');
const iqdInput = document.getElementById('iqd');
const usdInput = document.getElementById('usd');
const settingsModal = document.getElementById('settings-modal');
const settingsIcon = document.getElementById('settings-icon');
const saveBtn = document.getElementById('save-btn');
const closeBtn = document.getElementById('close-btn');

let timeout = null;

// Convert and update the fields
function convertCurrency(source, amount) {
    let sar, iqd, usd;

    if (source === 'SAR') {
        sar = amount;
        iqd = sar * exchangeRates.sarToIqd;
        usd = sar * exchangeRates.sarToUsd;
    } else if (source === 'IQD') {
        iqd = amount;
        sar = iqd / exchangeRates.sarToIqd;
        usd = iqd * exchangeRates.iqdToUsd;
    } else if (source === 'USD') {
        usd = amount;
        sar = usd / exchangeRates.sarToUsd;
        iqd = usd / exchangeRates.iqdToUsd;
    }

    // Update input fields with the converted values
    if (!isNaN(sar)) sarInput.value = sar % 1 === 0 ? sar : sar.toFixed(2);
    if (!isNaN(iqd)) iqdInput.value = iqd % 1 === 0 ? iqd : iqd.toFixed(2);
    if (!isNaN(usd)) usdInput.value = usd % 1 === 0 ? usd : usd.toFixed(2);
}

// Debounce function to delay the conversion
function debounceConvertCurrency(source, amount) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        convertCurrency(source, amount);
    }, 300); // 300ms debounce time
}

// Event listeners for input fields
sarInput.addEventListener('input', () => {
    const value = sarInput.value;
    if (value !== '') {
        debounceConvertCurrency('SAR', parseFloat(value));
    } else {
        iqdInput.value = '';
        usdInput.value = '';
    }
});

iqdInput.addEventListener('input', () => {
    const value = iqdInput.value;
    if (value !== '') {
        debounceConvertCurrency('IQD', parseFloat(value));
    } else {
        sarInput.value = '';
        usdInput.value = '';
    }
});

usdInput.addEventListener('input', () => {
    const value = usdInput.value;
    if (value !== '') {
        debounceConvertCurrency('USD', parseFloat(value));
    } else {
        sarInput.value = '';
        iqdInput.value = '';
    }
});

// Title click event to reset fields
document.getElementById('title').addEventListener('click', () => {
    sarInput.value = '';
    iqdInput.value = '';
    usdInput.value = '';
});

// Show settings modal
settingsIcon.addEventListener('click', () => {
    document.getElementById('sar-to-iqd').value = exchangeRates.sarToIqd;
    document.getElementById('sar-to-usd').value = exchangeRates.sarToUsd;
    document.getElementById('iqd-to-usd').value = exchangeRates.iqdToUsd;
    settingsModal.style.display = 'flex';
});

// Close settings modal
closeBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Save settings
saveBtn.addEventListener('click', () => {
    exchangeRates.sarToIqd = parseFloat(document.getElementById('sar-to-iqd').value);
    exchangeRates.sarToUsd = parseFloat(document.getElementById('sar-to-usd').value);
    exchangeRates.iqdToUsd = parseFloat(document.getElementById('iqd-to-usd').value);

    localStorage.setItem('sarToIqd', exchangeRates.sarToIqd);
    localStorage.setItem('sarToUsd', exchangeRates.sarToUsd);
    localStorage.setItem('iqdToUsd', exchangeRates.iqdToUsd);

    settingsModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});