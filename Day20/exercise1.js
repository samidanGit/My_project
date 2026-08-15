// 1. Fetch USD to ETB exchange rate
async function getUsdToEtbRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const data = await res.json();
    const rate = data.rates.ETB;
    console.log(`1 USD = ${rate} ETB`);
    return rate;
  } catch (err) {
    console.error('Failed to fetch exchange rate:', err.message);
  }
}

getUsdToEtbRate();
