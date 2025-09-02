import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-selector">
      <h3>Filtrar por Categoría</h3>
      <div className="category-buttons">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          Todas las categorías
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
