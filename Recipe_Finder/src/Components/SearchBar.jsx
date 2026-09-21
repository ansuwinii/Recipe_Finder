import { useState } from "react";

function SearchBar({ mode, onModeChange, onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <select value={mode} onChange={(e) => onModeChange(e.target.value)}>
        <option value="name">By name</option>
        <option value="ingredient">By ingredient</option>
      </select>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "name" ? "e.g. Arrabiata" : "e.g. chicken breast"}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;