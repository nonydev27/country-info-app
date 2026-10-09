// api.js
// -----------------------------------------------------------------------------
// This file holds ALL the code that talks to the REST Countries API.
// Keeping network code in one place is a good habit: if the API URL ever
// changes, we only edit this file instead of hunting through components.
//
// The API is free and needs NO API key.
// Docs: https://restcountries.com/
// -----------------------------------------------------------------------------

// The base URL we use. The {name} part gets replaced with what the user typed.
// `fields` lets us ask for ONLY the data we need, which keeps the response small
// and fast.
const BASE_URL = "https://restcountries.com/v3.1/name/";

// The specific pieces of data we want back from the API.
const FIELDS = [
  "name", // country name (common + official)
  "capital", // city/cities of the capital
  "population", // number of people
  "region", // continent-like region e.g. "Europe"
  "subregion", // smaller area e.g. "Western Europe"
  "languages", // object of spoken languages e.g. { eng: "English" }
  "flags", // URLs for the flag images
].join(",");

/**
 * Fetch country data by name.
 *
 * @param {string} name - The country name the user searched for.
 * @returns {Promise<Array>} A list of matching countries.
 * @throws {Error} A friendly error we can show in the UI.
 */
export async function fetchCountriesByName(name) {
  // `encodeURIComponent` makes special characters safe for a URL.
  // Example: "Côte d'Ivoire" becomes "C%C3%B4te%20d%27Ivoire".
  const url = `${BASE_URL}${encodeURIComponent(name)}?fields=${FIELDS}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    // This runs when the request never reached the server at all
    // (e.g. the user is offline, or the API is down).
    throw new Error(
      "Could not reach the server. Please check your internet connection and try again.",
    );
  }

  // The API returns HTTP 404 when no country matches the search.
  // That is not a "crash" — it just means "nothing found".
  if (response.status === 404) {
    return [];
  }

  // Any other non-2xx status is a real problem worth surfacing.
  if (!response.ok) {
    throw new Error(
      `The country service returned an error (status ${response.status}). Please try again.`,
    );
  }

  const data = await response.json();

  // Defensive check: make sure we actually got an array back.
  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}
