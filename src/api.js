// api.js
// -----------------------------------------------------------------------------
// Talks to countries.dev — a free, keyless REST API for country data.
// Docs: https://countries.dev/docs
//
// Migrated from restcountries.com v3.1 (deprecated) to countries.dev.
// The response shape is slightly different; see CountryCard for the mapping.
// -----------------------------------------------------------------------------

const BASE_URL = "https://countries.dev/name/";

/**
 * Fetch country data by name.
 *
 * @param {string} name - The country name the user searched for.
 * @returns {Promise<Array>} A list of matching countries.
 * @throws {Error} A friendly error we can show in the UI.
 */
export async function fetchCountriesByName(name) {
  const url = `${BASE_URL}${encodeURIComponent(name)}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Could not reach the server. Please check your internet connection and try again.",
    );
  }

  // 404 means no country matched — not an error, just empty results.
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `The country service returned an error (status ${response.status}). Please try again.`,
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}
