import React, { useState } from 'react';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';

const SimilarRecipes = ({
  recipe,
  similarRecipes,
  favorites,
  onAddToFavorites,
  onGoBack,
  onSelect
}) => {
  const [selectedSimilarRecipe, setSelectedSimilarRecipe] = useState(null);

  const handleAddToFavorites = (recipe) => {
    onAddToFavorites(recipe);
  };

  const handleGoBack = () => {
    onGoBack();
  };

  const handleSimilarRecipeSelect = (recipeId) => {
    const selectedRecipe = similarRecipes.find(
      (recipe) => recipe.id === recipeId
    );
    setSelectedSimilarRecipe(selectedRecipe);
  };

  return (
    <div className="similar-recipes">
      {selectedSimilarRecipe ? (
        <RecipeDetails
          recipe={selectedSimilarRecipe}
          onAddToFavorites={onAddToFavorites}
          onGoBack={handleGoBack}
          onSimilarRecipes={handleSimilarRecipeSelect}
        />
      ) : (
        <>
          <h2 className="similar-recipes-title">Similar Recipes</h2>
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
          <RecipeList
            recipes={similarRecipes}
            favorites={favorites}
            onAddToFavorites={handleAddToFavorites}
            onSelect={handleSimilarRecipeSelect}
          />
        </>
      )}
    </div>
  );
};

export default SimilarRecipes;
