import { useState } from "react";

/* Inline SVG search icon */
function SearchIcon() {
  return (
    <svg
      className="search-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SearchBar({ onSearch, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder="Try 'Japan', 'Brazil', 'Kenya'…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={disabled}
          aria-label="Country name"
        />
      </div>
      <button type="submit" className="search-button" disabled={disabled}>
        {disabled ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Searching…
          </>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}

export default SearchBar;
