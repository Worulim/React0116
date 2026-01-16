function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="sidebar">
      <h2>카테고리</h2>

      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-item${selectedCategory === cat ? ' active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
