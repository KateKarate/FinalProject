import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimilarRecipes from '../SimilarRecipes';

describe('SimilarRecipes', () => {
  const recipe = {
    id: 1,
    title: 'Recipe 1',
  };
  const similarRecipes = [
    { id: 2, title: 'Similar Recipe 1' },
    { id: 3, title: 'Similar Recipe 2' },
    { id: 4, title: 'Similar Recipe 3' },
  ];
  const favorites = [
    { id: 1, title: 'Favorite 1' },
    { id: 2, title: 'Favorite 2' },
    { id: 3, title: 'Favorite 3' },
  ];

  test('renders correctly', () => {
    render(
      <SimilarRecipes
        recipe={recipe}
        similarRecipes={similarRecipes}
        favorites={favorites}
        onAddToFavorites={jest.fn()}
        onGoBack={jest.fn()}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText(`Similar Recipes for ${recipe.title}`)).toBeInTheDocument();
    similarRecipes.forEach((similarRecipe) => {
      expect(screen.getByText(similarRecipe.title)).toBeInTheDocument();
    });
    favorites.forEach((favorite) => {
      expect(screen.getByText(favorite.title)).toBeInTheDocument();
    });
  });

  test('calls onAddToFavorites when "Add to Favorites" button is clicked', () => {
    const mockOnAddToFavorites = jest.fn();
    render(
      <SimilarRecipes
        recipe={recipe}
        similarRecipes={similarRecipes}
        favorites={favorites}
        onAddToFavorites={mockOnAddToFavorites}
        onGoBack={jest.fn()}
        onSelect={jest.fn()}
      />
    );

    const button = screen.getByText('Add to Favorites');
    fireEvent.click(button);
    expect(mockOnAddToFavorites).toHaveBeenCalledWith(recipe);
  });

  test('calls onGoBack when "Go Back" button is clicked', () => {
    const mockOnGoBack = jest.fn();
    render(
      <SimilarRecipes
        recipe={recipe}
        similarRecipes={similarRecipes}
        favorites={favorites}
        onAddToFavorites={jest.fn()}
        onGoBack={mockOnGoBack}
        onSelect={jest.fn()}
      />
    );

    const button = screen.getByText('Go Back');
    fireEvent.click(button);
    expect(mockOnGoBack).toHaveBeenCalled();
  });

  test('calls onSelect when a similar recipe is selected', () => {
    const mockOnSelect = jest.fn();
    render(
      <SimilarRecipes
        recipe={recipe}
        similarRecipes={similarRecipes}
        favorites={favorites}
        onAddToFavorites={jest.fn()}
        onGoBack={jest.fn()}
        onSelect={mockOnSelect}
      />
    );

    similarRecipes.forEach((similarRecipe) => {
      const button = screen.getByText(similarRecipe.title);
      fireEvent.click(button);
      expect(mockOnSelect).toHaveBeenCalledWith(similarRecipe.id);
    });
  });
});
