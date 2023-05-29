import React from 'react';

const SimilarRecipeDetails = ({
  recipe,
  onAddToFavorites,
  onGoBack,
  similarRecipes
}) => {
  const handleAddToFavorites = () => {
    onAddToFavorites(recipe);
  };

  const handleGoBack = () => {
    onGoBack();
  };

  if (!recipe || !similarRecipes) {
    return null;
  }

  return (
    <div className="similar-recipe-details">
      <h2 className="similar-recipe-details-title">Similar Recipe to {recipe.title}</h2>
      {recipe.image && (
        <div className="similar-recipe-details-image">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="similar-recipe-details-img"
            onClick={handleGoBack}
          />
        </div>
      )}
      <p className="recipe-details-info">Ready in: {recipe.readyInMinutes} minutes</p>
      <p className="recipe-details-info">Servings: {recipe.servings}</p>
      <h3 className="recipe-details-subtitle">Ingredients:</h3>
      <ul className="similar-recipe-details-list">
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          recipe.extendedIngredients.map((ingredient) => (
            <li className="recipe-details-list" key={ingredient.id}>
              {ingredient.original}
            </li>
          ))
        ) : (
          <p className="recipe-details-item">No ingredients available.</p>
        )}
      </ul>
      <h3 className="recipe-details-subtitle">Instructions:</h3>
      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
        <ol className="recipe-instruction-list" type="1">
          {recipe.analyzedInstructions[0].steps.map((step, index) => (
            <li className="recipe-details-item" key={index}>
              {step.step}
            </li>
          ))}
        </ol>
      ) : (
        <p className="similar-recipe-details-info">No instructions available.</p>
      )}
      <button className="recipe-details-button" onClick={handleAddToFavorites}>
        Add to Favorites
      </button>
      <button className="recipe-details-button" onClick={handleGoBack}>
        Go Back to Similar Recipes
      </button>
      <h2 className="similar-recipe-list-title">Similar Recipes</h2>
      <ul className="similar-recipe-list">
        {similarRecipes.map((recipe) => (
          <li className="similar-recipe-list-item" key={recipe.id}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarRecipeDetails;
