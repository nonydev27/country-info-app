import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import CountryCard from "./components/CountryCard.jsx";
import { fetchCountriesByName } from "./api.js";

// App is the "parent" component. It owns the state (the data) and decides
// what to render based on that state. The child components below it are
// "dumb": they just display what App gives them.

function App() {
  // --- State ----------------------------------------------------------------
  // `countries` holds the array of results from the API.
  const [countries, setCountries] = useState([]);

  // `loading` is true while we are waiting for the API to answer.
  const [loading, setLoading] = useState(false);

  // `error` holds a friendly message when something goes wrong.
  const [error, setError] = useState("");

  // `hasSearched` lets us tell the difference between
  // "the user has not searched yet" and "the user searched and got nothing".
  const [hasSearched, setHasSearched] = useState(false);

  // --- Search handler -------------------------------------------------------
  // This runs when the SearchBar tells us the user submitted a term.
  async function handleSearch(name) {
    // Reset the previous state so we do not show stale results or old errors.
    setLoading(true);
    setError("");
    setCountries([]);
    setHasSearched(true);

    try {
      const results = await fetchCountriesByName(name);
      setCountries(results);
    } catch (err) {
      // `err.message` is the friendly text we created inside api.js.
      setError(err.message);
    } finally {
      // `finally` always runs — success or failure — so loading is always cleared.
      setLoading(false);
    }
  }

  // --- Render ---------------------------------------------------------------
  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Country Info</h1>
        <p className="subtitle">
          Search any country to see its flag, capital, population, region and
          languages.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      <main className="results">
        {/* 1. LOADING STATE: show a spinner/message while fetching. */}
        {loading && (
          <p className="state-message loading" role="status">
            Loading countries...
          </p>
        )}

        {/* 2. ERROR STATE: something went wrong (network, server, etc.). */}
        {!loading && error && (
          <p className="state-message error" role="alert">
            ⚠️ {error}
          </p>
        )}

        {/* 3. EMPTY STATE: the search worked but found no matches. */}
        {!loading && !error && hasSearched && countries.length === 0 && (
          <p className="state-message empty">
            🔍 No countries found. Check the spelling and try again.
          </p>
        )}

        {/* 4. INITIAL STATE: the user has not searched yet. */}
        {!loading && !error && !hasSearched && (
          <p className="state-message empty">
            Start by typing a country name above.
          </p>
        )}

        {/* 5. SUCCESS STATE: show a card for each matching country. */}
        {!loading &&
          !error &&
          countries.map((country) => (
            // `key` helps React track each item in the list efficiently.
            // We use the country's unique code.
            <CountryCard key={country.name.common} country={country} />
          ))}
      </main>
    </div>
  );
}

export default App;
