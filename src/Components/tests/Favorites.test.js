import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Favorites from '../Favorites';

describe('Favorites', () => {
  const favorites = [
    { id: 1, title: 'Favorite 1' },
    { id: 2, title: 'Favorite 2' },
    { id: 3, title: 'Favorite 3' },
  ];

  test('renders correctly', () => {
    render(<Favorites favorites={favorites} removeFromFavorites={jest.fn()} />);
    favorites.forEach((favorite) => {
      expect(screen.getByText(favorite.title)).toBeInTheDocument();
    });
  });

  test('calls removeFromFavorites when a favorite is removed', () => {
    const mockRemoveFromFavorites = jest.fn();
    render(<Favorites favorites={favorites} removeFromFavorites={mockRemoveFromFavorites} />);

    favorites.forEach((favorite) => {
      const button = screen.getByText('Remove');
      fireEvent.click(button);
      expect(mockRemoveFromFavorites).toHaveBeenCalledWith(favorite.id);
    });
  });
});
