import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipeSearch from '../RecipeSearch';

describe('RecipeSearch', () => {
  test('renders correctly', () => {
    render(<RecipeSearch />);
    expect(screen.getByLabelText('Search by:')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('handles ingredient search', () => {
    const mockSearchByIngredients = jest.fn();
    render(<RecipeSearch onSearchByIngredients={mockSearchByIngredients} />);

    const input = screen.getByPlaceholderText('Enter ingredients separated by comma');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'apple, banana' } });
    fireEvent.click(button);

    expect(mockSearchByIngredients).toHaveBeenCalledWith(['apple', 'banana']);
  });

  test('handles nutrition search', () => {
    const mockSearchByNutrition = jest.fn();
    render(<RecipeSearch onSearchByNutrition={mockSearchByNutrition} />);

    const input = screen.getByLabelText('Minimum Carbs:');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.click(button);

    expect(mockSearchByNutrition).toHaveBeenCalledWith({ minCarbs: '20' });
  });
});
