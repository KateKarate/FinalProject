import React, { useState } from 'react';

const RecipeDetails = ({
  recipe,
  onAddToFavorites,
  onSimilarRecipes,
  onGoBack
}) => {
  const [showAddButton, setShowAddButton] = useState(true);

  const handleAddToFavorites = () => {
    onAddToFavorites(recipe);
    setShowAddButton(false);
  };

  const handleSimilarRecipes = () => {
    onSimilarRecipes();
  };

  const handleGoBack = () => {
    onGoBack();
  };

  return (
    <div className="recipe-details">
      <h2 className="recipe-details-title">{recipe.title}</h2>
      {recipe.image && (
          <img className="recipe-details-image" src={recipe.image} alt={recipe.title} />
      )}
      <p className="recipe-details-info">Ready in: {recipe.readyInMinutes} minutes</p>
      <p className="recipe-details-info">Servings: {recipe.servings}</p>
      <h3 className="recipe-details-subtitle">Ingredients:</h3>
      <ul className="recipe-details-list">
        {recipe.extendedIngredients &&
          recipe.extendedIngredients.map((ingredient) => (
            <li className="recipe-details-item" key={ingredient.id}>{ingredient.original}</li>
          ))}
      </ul>
      <h3 className="recipe-instructions-subtitle">Instructions:</h3>
      <ol className="recipe-instruction-list">
        {recipe.analyzedInstructions &&
          recipe.analyzedInstructions[0].steps.map((step) => (
            <li className="recipe-details-item" key={step.number}>{step.step}</li>
          ))}
      </ol>
      {showAddButton && (
        <button className="recipe-details-button" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      )}
      <button className="recipe-details-button" onClick={handleSimilarRecipes}>
        Find Similar Recipes
      </button>
      <button className="recipe-details-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default RecipeDetails;
