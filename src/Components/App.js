import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from './config';
import RecipeSearch from './RecipeSearch';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import Favorites from './Favorites';
import SimilarRecipes from './SimilarRecipes';
import '../styles/App.scss';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [showSimilarRecipes, setShowSimilarRecipes] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipesByIngredients = async (ingredients) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recipes/findByIngredients`, {
        params: {
          apiKey: API_KEY,
          ingredients: ingredients.join(','),
        },
      });
      setRecipes(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Error fetching recipes. Please try again later.');
      setRecipes([]);
    }
    setLoading(false);
  };

  const fetchRecipesByNutrition = async (nutrition) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recipes/findByNutrients`, {
        params: {
          apiKey: API_KEY,
          ...nutrition,
        },
      });
      setRecipes(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Error fetching recipes. Please try again later.');
      setRecipes([]);
    }
    setLoading(false);
  };

  const fetchSimilarRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recipes/${selectedRecipe.id}/similar`, {
        params: {
          apiKey: API_KEY,
        },
      });
      setSimilarRecipes(response.data);
      setShowSimilarRecipes(true);
    } catch (error) {
      console.error('Error fetching similar recipes:', error);
      setError('Error fetching similar recipes. Please try again later.');
    }
    setLoading(false);
  };

  const fetchRecipeDetails = async (recipeId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recipes/${recipeId}/information`, {
        params: {
          apiKey: API_KEY,
        },
      });
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Error fetching recipe details. Please try again later.');
    }
    setLoading(false);
  };

  const handleRecipeSelect = (recipeId) => {
    fetchRecipeDetails(recipeId);
  };

  const handleAddToFavorites = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const handleRemoveFromFavorites = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const handleSimilarRecipes = () => {
    fetchSimilarRecipes();
  };

  const handleGoBack = () => {
    setSelectedRecipe(null);
    setSimilarRecipes([]);
    setShowSimilarRecipes(false);
  };

  return (
    <div className="app">
      <h1 className="app-title">Ration Planning App</h1>
      {selectedRecipe && !showSimilarRecipes ? (
        <RecipeDetails
          recipe={selectedRecipe}
          onAddToFavorites={handleAddToFavorites}
          onSimilarRecipes={handleSimilarRecipes}
          onGoBack={handleGoBack}
        />
      ) : showSimilarRecipes ? (
        <SimilarRecipes
          recipe={selectedRecipe}
          similarRecipes={similarRecipes}
          favorites={favorites}
          onAddToFavorites={handleAddToFavorites}
          onGoBack={handleGoBack}
          onSelect={handleRecipeSelect}
        />
      ) : (
        <>
          <RecipeSearch
            onSearchByIngredients={fetchRecipesByIngredients}
            onSearchByNutrition={fetchRecipesByNutrition}
          />
          {loading ? (
            <div className="loader">
              <div className="loader-spinner"></div>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <RecipeList recipes={recipes} onSelect={handleRecipeSelect} />
              <Favorites
                favorites={favorites}
                removeFromFavorites={handleRemoveFromFavorites}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
