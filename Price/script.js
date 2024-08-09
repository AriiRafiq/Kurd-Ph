// script.js
document.addEventListener('DOMContentLoaded', function() {
    const sarInput = document.getElementById('sar');
    const iqdInput = document.getElementById('iqd');
    const usdInput = document.getElementById('usd');

    const sarToIqdInput = document.getElementById('sarToIqd');
    const sarToUsdInput = document.getElementById('sarToUsd');
    const usdToIqdInput = document.getElementById('usdToIqd');

    const settingsModal = document.getElementById('settings-modal');
    const settingsIcon = document.getElementById('settings-icon');
    const saveSettingsBtn = document.getElementById('save-btn');
    const closeSettingsBtn = document.getElementById('close-btn');
    const modalCloseSpan = document.querySelector('.close');

    let rates = {
        sarToIqd: parseFloat(localStorage.getItem('sarToIqd')) || 398.15,
        sarToUsd: parseFloat(localStorage.getItem('sarToUsd')) || 0.26,
        usdToIqd: parseFloat(localStorage.getItem('usdToIqd')) || 1501
    };

    function updateConversions() {
        sarToIqdInput.value = rates.sarToIqd;
        sarToUsdInput.value = rates.sarToUsd;
        usdToIqdInput.value = rates.usdToIqd;
    }

    function formatNumber(value) {
        return value.toLocaleString();
    }

    function convertCurrency(event) {
        const inputId = event.target.id;
        let sarValue, iqdValue, usdValue;

        if (inputId === 'sar') {
            sarValue = parseFloat(sarInput.value.replace(/,/g, '')) || 0;
            iqdValue = sarValue * rates.sarToIqd;
            usdValue = sarValue * rates.sarToUsd;
        } else if (inputId === 'iqd') {
            iqdValue = parseFloat(iqdInput.value.replace(/,/g, '')) || 0;
            sarValue = iqdValue / rates.sarToIqd;
            usdValue = sarValue * rates.sarToUsd;
        } else if (inputId === 'usd') {
            usdValue = parseFloat(usdInput.value.replace(/,/g, '')) || 0;
            sarValue = usdValue / rates.sarToUsd;
            iqdValue = usdValue * rates.usdToIqd;
        }

        sarInput.value = formatNumber(sarValue.toFixed(2));
        iqdInput.value = formatNumber(iqdValue.toFixed(2));
        usdInput.value = formatNumber(usdValue.toFixed(2));
    }

    sarInput.addEventListener('input', convertCurrency);
    iqdInput.addEventListener('input', convertCurrency);
    usdInput.addEventListener('input', convertCurrency);

    document.getElementById('title').addEventListener('click', () => {
        sarInput.value = '';
        iqdInput.value = '';
        usdInput.value = '';
    });

    settingsIcon.addEventListener('click', () => {
        updateConversions();
        settingsModal.style.display = 'flex';
    });

    saveSettingsBtn.addEventListener('click', () => {
        rates.sarToIqd = parseFloat(sarToIqdInput.value) || rates.sarToIqd;
        rates.sarToUsd = parseFloat(sarToUsdInput.value) || rates.sarToUsd;
        rates.usdToIqd = parseFloat(usdToIqdInput.value) || rates.usdToIqd;

        localStorage.setItem('sarToIqd', rates.sarToIqd);
        localStorage.setItem('sarToUsd', rates.sarToUsd);
        localStorage.setItem('usdToIqd', rates.usdToIqd);

        settingsModal.style.display = 'none';
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    modalCloseSpan.addEventListener('click', () => {


        settingsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
});