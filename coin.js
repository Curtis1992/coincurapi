const APP_ID = '<YOUR_APP_ID>';
const BASE_URL = 'openexchangerates.org';
const https = require('https');

const [fromCurrency, toCurrency, amount] = process.argv.slice(2, 5);

if (!fromCurrency || !toCurrency || !amount) {
  console.error('Usage: node app.js <fromCurrency> <toCurrency> <amount>');
  process.exit(1);
}


const path = `/api/latest.json?app_id=${APP_ID}&base=USD`;

const options = {
  hostname: BASE_URL,
  path: path,
  method: 'GET',
};

const req = https.get(options, response => {
  const data = [];

  response.on('data', chunk => data.push(chunk));

  response.on('end', () => {
    const body = JSON.parse(data.join(''));

    
    const amountInUSD = amount / body.rates[fromCurrency];
    