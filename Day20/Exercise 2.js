fetch('https://restcountries.com/v3.1/name/ethiopia')
  .then(res => res.json())
  .then(data => render(data))
  .catch(err => console.error(err));
async function loadCountryData() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/name/ethiopia');
    if (!res.ok) throw new Error('Network response was not ok');
    
    const data = await res.json();
    console.log('Country Data:', data[0].name.common);
  } catch (err) {
    console.error('Error fetching country:', err.message);
  }
}

loadCountryData();
