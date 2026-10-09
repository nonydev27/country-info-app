import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import CountryCard from "./components/CountryCard.jsx";
import { fetchCountriesByName } from "./api.js";

/* Animated SVG globe displayed in the hero — pure vectors, no images needed */
function GlobeIcon() {
  return (
    <svg
      className="hero-globe"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer glow circle */}
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#58a6ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="globeFill" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1d3557" />
          <stop offset="100%" stopColor="#0d1117" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx="100" cy="100" r="72" />
        </clipPath>
      </defs>

      {/* Glow halo */}
      <circle cx="100" cy="100" r="90" fill="url(#globeGlow)" />

      {/* Globe body */}
      <circle cx="100" cy="100" r="72" fill="url(#globeFill)" />

      {/* Latitude lines */}
      <g clipPath="url(#globeClip)" stroke="#58a6ff" strokeWidth="0.8" strokeOpacity="0.35" fill="none">
        <ellipse cx="100" cy="100" rx="72" ry="18" />
        <ellipse cx="100" cy="100" rx="72" ry="40" />
        <line x1="28" y1="100" x2="172" y2="100" />
        <line x1="100" y1="28" x2="100" y2="172" />
      </g>

      {/* Longitude lines */}
      <g clipPath="url(#globeClip)" stroke="#a371f7" strokeWidth="0.8" strokeOpacity="0.3" fill="none">
        <ellipse cx="100" cy="100" rx="36" ry="72" />
        <ellipse cx="100" cy="100" rx="60" ry="72" />
      </g>

      {/* Globe border */}
      <circle cx="100" cy="100" r="72" fill="none" stroke="#58a6ff" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Highlight */}
      <ellipse cx="80" cy="72" rx="22" ry="14" fill="white" fillOpacity="0.05" />
    </svg>
  );
}

/* Spinning loader SVG */
function Spinner() {
  return (
    <svg
      className="spinner-svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="25" cy="25" r="20"
        fill="none"
        stroke="url(#spinnerGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="90 62"
      />
      <defs>
        <linearGradient id="spinnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#58a6ff" />
          <stop offset="100%" stopColor="#a371f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(name) {
    setLoading(true);
    setError("");
    setCountries([]);
    setHasSearched(true);

    try {
      const results = await fetchCountriesByName(name);
      setCountries(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <GlobeIcon />
        <h1>Country Explorer</h1>
        <p className="subtitle">
          Discover flags, capitals, populations, languages and more for any country on Earth.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      <main className="results">
        {/* LOADING */}
        {loading && (
          <div className="state-message loading" role="status">
            <Spinner />
            <span>Searching the world…</span>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <p className="state-message error" role="alert">
            ⚠️ {error}
          </p>
        )}

        {/* EMPTY SEARCH */}
        {!loading && !error && hasSearched && countries.length === 0 && (
          <p className="state-message empty">
            🔍 No countries found. Try a different spelling.
          </p>
        )}

        {/* INITIAL */}
        {!loading && !error && !hasSearched && (
          <p className="state-message empty">
            ✦ Type a country name above to begin your journey.
          </p>
        )}

        {/* RESULTS */}
        {!loading &&
          !error &&
          countries.map((country, index) => (
            <CountryCard
              key={country.name.common}
              country={country}
              index={index}
            />
          ))}
      </main>
    </div>
  );
}

export default App;
