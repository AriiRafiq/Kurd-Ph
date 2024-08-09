// Fallback in-memory storage
let inMemoryStorage = {};

// Function to get data from localStorage or in-memory storage
function getStorageItem(key, defaultValue) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(key) !== null) {
        return parseFloat(localStorage.getItem(key)) || defaultValue;
    } else {
        return inMemoryStorage[key] !== undefined ? inMemoryStorage[key] : defaultValue;
    }
}

// Function to set data in localStorage or in-memory storage
function setStorageItem(key, value) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
    } else {
        inMemoryStorage[key] = value;
    }
}

// Initialize exchange rates with fallback
let exchangeRates = {
    sarToIqd: getStorageItem('sarToIqd', 398.15),
    sarToUsd: getStorageItem('sarToUsd', 0.26),
    usdToIqd: getStorageItem('usdToIqd', 1501)
};

const sarInput = document.getElementById('sar');
const iqdInput = document.getElementById('iqd');
const usdInput = document.getElementById('usd');
const settingsModal = document.getElementById('settings-modal');
const settingsIcon = document.getElementById('settings-icon');
const saveBtn = document.getElementById('save-btn');
const closeBtn = document.getElementById('close-btn');

let timeout = null;

// Function to format numbers with commas
function formatNumber(num) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Remove commas from formatted number
function removeCommas(num) {
    return num.replace(/,/g, '');
}

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
        usd = iqd / exchangeRates.usdToIqd;
    } else if (source === 'USD') {
        usd = amount;
        sar = usd / exchangeRates.sarToUsd;
        iqd = usd * exchangeRates.usdToIqd;
    }

    // Update input fields with the converted values and formatted with commas
    if (!isNaN(sar)) sarInput.value = formatNumber(sar);
    if (!isNaN(iqd)) iqdInput.value = formatNumber(iqd);
    if (!isNaN(usd)) usdInput.value = formatNumber(usd);
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
    const value = removeCommas(sarInput.value);
    if (value !== '') {
        debounceConvertCurrency('SAR', parseFloat(value));
    } else {
        iqdInput.value = '';
        usdInput.value = '';
    }
});

iqdInput.addEventListener('input', () => {
    const value = removeCommas(iqdInput.value);
    if (value !== '') {
        debounceConvertCurrency('IQD', parseFloat(value));
    } else {
        sarInput.value = '';
        usdInput.value = '';
    }
});

usdInput.addEventListener('input', () => {
    const value = removeCommas(usdInput.value);
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
    document.getElementById('usd-to-iqd').value = exchangeRates.usdToIqd;
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
    exchangeRates.usdToIqd = parseFloat(document.getElementById('usd-to-iqd').value);

    setStorageItem('sarToIqd', exchangeRates.sarToIqd);
    setStorageItem('sarToUsd', exchangeRates.sarToUsd);
    setStorageItem('usdToIqd', exchangeRates.usdToIqd);

    settingsModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});