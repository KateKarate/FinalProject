import React, { useState } from 'react';
import RecipeList from './RecipeList';
import SimilarRecipeDetails from './SimilarRecipeDetails';

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
        <SimilarRecipeDetails
          recipe={selectedSimilarRecipe}
          onAddToFavorites={onAddToFavorites}
          onGoBack={onGoBack}
        />
      ) : (
        <>
          <h2 className="similar-recipes-title">Similar Recipes</h2>
          <button className="similar-recipes-button" onClick={handleGoBack}>
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
