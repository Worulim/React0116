function Header({ query, onQueryChange }) {
  return (
    <header className="header">
      <h1>📝 메모장</h1>

      <input
        className="search-input"
        type="text"
        placeholder="메모 검색 (제목/내용)"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </header>
  );
}

export default Header;
