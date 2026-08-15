async function fetchTopTwoCountriesInParallel() {
  try {
    // 1. Fetch main list
    const listRes = await fetch('https://restcountries.com/v3.1/region/africa');
    if (!listRes.ok) throw new Error('Failed to fetch country list');
    const countries = await listRes.json();

    const country1 = countries[0].name.common;
    const country2 = countries[1].name.common;

    console.log(`Fetching details in parallel for: ${country1} & ${country2}...`);

    // 2. Fetch details for both at the same time using Promise.all
    const [res1, res2] = await Promise.all([
      fetch(`https://restcountries.com/v3.1/name/${country1}?fullText=true`),
      fetch(`https://restcountries.com/v3.1/name/${country2}?fullText=true`)
    ]);

    if (!res1.ok || !res2.ok) throw new Error('Failed parallel fetch request');

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    console.log('Parallel Result 1:', data1[0].name.common, '| Capital:', data1[0].capital[0]);
    console.log('Parallel Result 2:', data2[0].name.common, '| Capital:', data2[0].capital[0]);

  } catch (err) {
    console.error('Parallel fetch error:', err.message);
  }
}

fetchTopTwoCountriesInParallel();
