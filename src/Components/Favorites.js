import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
  const handleRemove = (recipeId) => {
    removeFromFavorites(recipeId);
  };

  return (
    <div className="favorites">
      <h2 className="favorites-title">My Favorites</h2>
      {favorites.length === 0 ? (
        <p className="favorites-empty">No favorites yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((recipe) => (
            <li className="favorites-item" key={recipe.id}>
              {recipe.title}
              <button className="favorites-button" onClick={() => handleRemove(recipe.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
