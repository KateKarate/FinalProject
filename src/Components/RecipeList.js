import React from 'react';

const RecipeList = ({ recipes, onSelect }) => {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li className="recipe-item" key={recipe.id}>
          <button className="recipe-list-item" onClick={() => onSelect(recipe.id)}>
            {recipe.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
