const out = document.querySelector("#facts");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

// Helper function to safely append facts using createElement
function appendFactRow(parent, label, value) {
  const row = document.createElement("div");
  row.className = "fact-row";

  const labelEl = document.createElement("span");
  labelEl.className = "fact-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "fact-value";
  valueEl.textContent = value;

  row.appendChild(labelEl);
  row.appendChild(valueEl);
  parent.appendChild(row);
}

async function showCountry(name) {
  // 1. Loading State
  out.className = "facts-card";
  out.textContent = "";
  
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "state-loading";
  loadingDiv.textContent = "Loading...";
  out.appendChild(loadingDiv);

  try {
    // 2. Fetch Data
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    
    // Check res.ok (Handles 404 & HTTP errors)
    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [c] = await res.json();

    // Clear loading state
    out.innerHTML = "";

    // Render Flag
    if (c.flags?.png) {
      const flag = document.createElement("img");
      flag.src = c.flags.png;
      flag.alt = c.flags.alt || `Flag of ${c.name?.common || name}`;
      flag.className = "flag-img";
      out.appendChild(flag);
    }

    // Safely extract capital, region, population, and currencies
    const capital = c.capital?.[0] || "N/A";
    const population = c.population ? c.population.toLocaleString() : "N/A";
    const region = c.region || "N/A";

    let currencies = "N/A";
    if (c.currencies) {
      currencies = Object.values(c.currencies)
        .map(curr => `${curr.name} (${curr.symbol || ''})`)
        .join(", ");
    }

    // Render DOM elements via helper function
    appendFactRow(out, "Country", c.name?.common || name);
    appendFactRow(out, "Capital", capital);
    appendFactRow(out, "Population", population);
    appendFactRow(out, "Region", region);
    appendFactRow(out, "Currencies", currencies);

  } catch (err) {
    // 3. Error State
    out.innerHTML = "";
    const errorDiv = document.createElement("div");
    errorDiv.className = "state-error";
    errorDiv.textContent = err.message || "Failed to fetch country data";
    out.appendChild(errorDiv);
  }
}

// Event Listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    showCountry(query);
  }
});

// Default load: Ethiopia
showCountry("ethiopia");
