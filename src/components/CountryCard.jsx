// CountryCard shows the details for ONE country.
// It only receives data ("props") and displays it — it does not fetch anything.

/**
 * Turn the API "languages" object into a readable sentence.
 * The API gives us: { eng: "English", fra: "French" }
 * We want:          "English, French"
 */
function formatLanguages(languages) {
  if (!languages) return "Not available";
  return Object.values(languages).join(", ");
}

/**
 * Turn a number into a string with thousands separators.
 * Example: 126476461 -> "126,476,461"
 */
function formatPopulation(population) {
  if (typeof population !== "number") return "Not available";
  return population.toLocaleString();
}

function CountryCard({ country }) {
  // The API sometimes has no capital for a country, so fall back gracefully.
  const capital =
    country.capital && country.capital.length > 0
      ? country.capital.join(", ")
      : "Not available";

  return (
    <article className="country-card">
      {/* Flag image. `alt` describes the image for screen readers. */}
      <img
        className="country-flag"
        src={country.flags?.png || country.flags?.svg}
        alt={`Flag of ${country.name.common}`}
      />

      <div className="country-details">
        <h2 className="country-name">{country.name.common}</h2>
        <p className="country-official">{country.name.official}</p>

        {/* A simple list of key/value rows. */}
        <ul className="country-info">
          <li>
            <span className="label">Capital</span>
            <span>{capital}</span>
          </li>
          <li>
            <span className="label">Population</span>
            <span>{formatPopulation(country.population)}</span>
          </li>
          <li>
            <span className="label">Region</span>
            <span>{country.region || "Not available"}</span>
          </li>
          <li>
            <span className="label">Languages</span>
            <span>{formatLanguages(country.languages)}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default CountryCard;
