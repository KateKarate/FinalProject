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

  return (
    <div className="similar-recipe-details">
      <h2 className="similar-recipe-details-title">Similar Recipe to {recipe.title}</h2>
      {recipe.image && (
        <div className="similar-recipe-details-image">
          <img src={recipe.image} alt={recipe.title} />
        </div>
      )}
      <p className="similar-recipe-details-info">Ready in: {recipe.readyInMinutes} minutes</p>
      <p className="similar-recipe-details-info">Servings: {recipe.servings}</p>
      <h3 className="similar-recipe-details-subtitle">Ingredients:</h3>
      <ul className="similar-recipe-details-list">
        {recipe.extendedIngredients &&
          recipe.extendedIngredients.map((ingredient) => (
            <li className="similar-recipe-details-item" key={ingredient.id}>{ingredient.original}</li>
          ))}
      </ul>
      <h3 className="similar-recipe-details-subtitle">Instructions:</h3>
      {recipe.instructions && recipe.instructions.length > 0 ? (
        <ol className="similar-recipe-details-list">
          {recipe.instructions.map((step, index) => (
            <li className="similar-recipe-details-item" key={index}>{step.step}</li>
          ))}
        </ol>
      ) : (
        <p className="similar-recipe-details-info">No instructions available.</p>
      )}
      <button className="similar-recipe-details-button" onClick={handleAddToFavorites}>
        Add to Favorites
      </button>
      <button className="similar-recipe-details-button" onClick={handleGoBack}>
        Go Back to Similar Recipes
      </button>
      <h2 className="similar-recipe-list-title">Similar Recipes</h2>
      <ul className="similar-recipe-list">
        {similarRecipes.map((recipe) => (
          <li className="similar-recipe-list-item" key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarRecipeDetails;
