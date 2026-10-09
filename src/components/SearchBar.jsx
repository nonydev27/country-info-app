import { useState } from "react";

// SearchBar is a "controlled component": React owns the text value,
// not the browser. We keep it in state so we always know what was typed.
//
// Props:
//   onSearch -> a function we call with the typed text when the user submits.
//   disabled -> true while loading, so the user cannot fire a second search.
function SearchBar({ onSearch, disabled }) {
  const [text, setText] = useState("");

  // Runs when the <form> is submitted (button click OR pressing Enter).
  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const trimmed = text.trim();
    if (!trimmed) return; // ignore empty searches

    onSearch(trimmed); // hand the search term up to App
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Try 'Japan', 'Brazil', 'Kenya'..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={disabled}
        aria-label="Country name"
      />
      <button type="submit" className="search-button" disabled={disabled}>
        {disabled ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
