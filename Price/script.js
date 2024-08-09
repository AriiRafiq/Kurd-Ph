const sarInput = document.getElementById('sar');
const iqdInput = document.getElementById('iqd');
const usdInput = document.getElementById('usd');
const title = document.getElementById('title');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');
const sarToIqdInput = document.getElementById('sarToIqd');
const usdToSarInput = document.getElementById('usdToSar');
const usdToIqdInput = document.getElementById('usdToIqd');

let sarToIqd = 398.15;
let usdToSar = 3.77;
let usdToIqd = 1501;

function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('converterSettings'));
    if (savedSettings) {
        sarToIqd = savedSettings.sarToIqd;
        usdToSar = savedSettings.usdToSar;
        usdToIqd = savedSettings.usdToIqd;
    }
    updateSettingsInputs();
}

function updateSettingsInputs() {
    sarToIqdInput.value = sarToIqd;
    usdToSarInput.value = usdToSar;
    usdToIqdInput.value = usdToIqd;
}

function saveSettings() {
    sarToIqd = parseFloat(sarToIqdInput.value);
    usdToSar = parseFloat(usdToSarInput.value);
    usdToIqd = parseFloat(usdToIqdInput.value);
    localStorage.setItem('converterSettings', JSON.stringify({ sarToIqd, usdToSar, usdToIqd }));
    updateConversion();
}

function formatNumber(num) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function convert(from, value) {
    const numValue = parseFloat(value.replace(/,/g, ''));
    if (isNaN(numValue)) return;

    switch (from) {
        case 'sar':
            iqdInput.value = formatNumber(numValue * sarToIqd);
            usdInput.value = formatNumber(numValue / usdToSar);
            break;
        case 'iqd':
            sarInput.value = formatNumber(numValue / sarToIqd);
            usdInput.value = formatNumber(numValue / usdToIqd);
            break;
        case 'usd':
            sarInput.value = formatNumber(numValue * usdToSar);
            iqdInput.value = formatNumber(numValue * usdToIqd);
            break;
    }
}

function updateConversion() {
    if (sarInput.value) convert('sar', sarInput.value);
    else if (iqdInput.value) convert('iqd', iqdInput.value);
    else if (usdInput.value) convert('usd', usdInput.value);
}

sarInput.addEventListener('input', (e) => convert('sar', e.target.value));
iqdInput.addEventListener('input', (e) => convert('iqd', e.target.value));
usdInput.addEventListener('input', (e) => convert('usd', e.target.value));

title.addEventListener('click', () => {
    sarInput.value = '';
    iqdInput.value = '';
    usdInput.value = '';
});

settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

saveBtn.addEventListener('click', () => {
    saveSettings();
    settingsModal.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

loadSettings();