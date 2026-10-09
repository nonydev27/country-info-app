// CountryCard shows the details for ONE country.
// Adapted for the countries.dev API response shape:
//   country.name        → plain string
//   country.nativeName  → plain string (native/official name)
//   country.capital     → plain string
//   country.languages   → array of { name, iso639_1, ... }
//   country.flags       → { png, svg }

function formatLanguages(languages) {
  if (!Array.isArray(languages) || languages.length === 0) return "—";
  return languages.map((l) => l.name).filter(Boolean).join(", ");
}

function formatPopulation(population) {
  if (typeof population !== "number") return "—";
  return population.toLocaleString();
}

function CountryCard({ country, index = 0 }) {
  const capital = country.capital || "—";
  const officialName = country.nativeName || country.name;

  return (
    <article className="country-card" style={{ "--card-index": index }}>
      <img
        className="country-flag"
        src={country.flags?.svg || country.flags?.png}
        alt={`Flag of ${country.name}`}
      />

      <div className="country-details">
        <h2 className="country-name">{country.name}</h2>
        <p className="country-official">{officialName}</p>

        <ul className="country-info">
          <li>
            <span className="label">Capital</span>
            <span className="value">{capital}</span>
          </li>
          <li>
            <span className="label">Population</span>
            <span className="value">{formatPopulation(country.population)}</span>
          </li>
          <li>
            <span className="label">Region</span>
            <span className="value">{country.region || "—"}</span>
          </li>
          <li>
            <span className="label">Subregion</span>
            <span className="value">{country.subregion || "—"}</span>
          </li>
          <li>
            <span className="label">Languages</span>
            <span className="value">{formatLanguages(country.languages)}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default CountryCard;
