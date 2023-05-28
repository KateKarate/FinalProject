import React, { useState } from 'react';

const RecipeSearch = ({ onSearchByIngredients, onSearchByNutrition }) => {
  const [searchType, setSearchType] = useState('ingredients');
  const [searchValue, setSearchValue] = useState('');
  const [nutrition, setNutrition] = useState({
    minCarbs: '',
    minProtein: '',
    minFat: '',
  });

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition((prevNutrition) => ({
      ...prevNutrition,
      [name]: value,
    }));
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = () => {
    if (searchType === 'ingredients') {
      onSearchByIngredients(searchValue.split(',').map((ingredient) => ingredient.trim()));
    } else if (searchType === 'nutrition') {
      onSearchByNutrition(nutrition);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="recipe-search">
      <div className="recipe-search-field">
        <label className="recipe-search-label">
          Search by:
          <select
            className="recipe-search-select"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="ingredients">Ingredients</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </label>
      </div>
      {searchType === 'ingredients' ? (
        <div className="recipe-search-field">
          <input
            className="recipe-search-input"
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter ingredients separated by comma"
          />
        </div>
      ) : (
        <div className="recipe-search-field">
          <label className="recipe-search-label">
            Minimum Carbs:
            <input
              className="recipe-search-input"
              type="text"
              name="minCarbs"
              value={nutrition.minCarbs}
              onChange={handleNutritionChange}
              onKeyPress={handleKeyPress}
            />
          </label>
          <label className="recipe-search-label">
            Minimum Protein:
            <input
              className="recipe-search-input"
              type="text"
              name="minProtein"
              value={nutrition.minProtein}
              onChange={handleNutritionChange}
              onKeyPress={handleKeyPress}
            />
          </label>
          <label className="recipe-search-label">
            Minimum Fat:
            <input
              className="recipe-search-input"
              type="text"
              name="minFat"
              value={nutrition.minFat}
              onChange={handleNutritionChange}
              onKeyPress={handleKeyPress}
            />
          </label>
        </div>
      )}
      <button className="recipe-search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default RecipeSearch;
