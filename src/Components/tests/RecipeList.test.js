import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipeList from '../RecipeList';

describe('RecipeList', () => {
  const recipes = [
    { id: 1, title: 'Recipe 1' },
    { id: 2, title: 'Recipe 2' },
    { id: 3, title: 'Recipe 3' },
  ];

  test('renders correctly', () => {
    render(<RecipeList recipes={recipes} onSelect={jest.fn()} />);
    recipes.forEach((recipe) => {
      expect(screen.getByText(recipe.title)).toBeInTheDocument();
    });
  });

  test('calls onSelect when a recipe is selected', () => {
    const mockOnSelect = jest.fn();
    render(<RecipeList recipes={recipes} onSelect={mockOnSelect} />);

    recipes.forEach((recipe) => {
      const button = screen.getByText(recipe.title);
      fireEvent.click(button);
      expect(mockOnSelect).toHaveBeenCalledWith(recipe.id);
    });
  });
});
