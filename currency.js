BASE_URL = 'https://openexchangerates.org/api';
const APP_ID = '<3c2aa252d7a74448bca11330ab997c6f>'; // replace this with your own API key
async function getCurrencies() {
const response = await fetch(`${BASE_URL}/currencies.json`);
const data = await response.json();
return data;
}
async function populateCurrencies() {
const currencies = await getCurrencies();
const selects = [document.getElementById('fromSelect'), document.getElementById('toSelect')];
for (const select of selects) {
select.innerHTML = '';
for (const [symbol, name] of Object.entries(currencies)) {
const option = document.createElement('option');
option.value = symbol;
option.textContent = `${symbol} (${name})`;
select.appendChild(option);
}
}
// Set defaults
selects[0].value = "USD";
selects[1].value = "EUR";
}
document.addEventListener('DOMContentLoaded', () => {
populateCurrencies();
});
async function convertCurrency(fromCurrency, toCurrency, amount) {
const response = await fetch(`${BASE_URL}/latest.json?app_id=${APP_ID}&base=${fromCurrency}`);
const data = await response.json();
const converted = data.rates[toCurrency] * amount;
return converted;
}
