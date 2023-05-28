import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipeDetails from '../RecipeDetails';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

describe('RecipeDetails', () => {
  const recipe = {
    id: 1,
    title: 'Recipe 1',
  };

  test('renders correctly', () => {
    render(
      <ErrorBoundary>
        <RecipeDetails
          recipe={recipe}
          onAddToFavorites={jest.fn()}
          onSimilarRecipes={jest.fn()}
          onGoBack={jest.fn()}
        />
      </ErrorBoundary>
    );

    const recipeTitle = screen.getByText('Recipe 1');
    expect(recipeTitle).toBeInTheDocument();
  });

  test('calls onGoBack when "Go Back" button is clicked', () => {
    const mockOnGoBack = jest.fn();
    render(
      <ErrorBoundary>
        <RecipeDetails
          recipe={recipe}
          onAddToFavorites={jest.fn()}
          onSimilarRecipes={jest.fn()}
          onGoBack={mockOnGoBack}
        />
      </ErrorBoundary>
    );

    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);
    expect(mockOnGoBack).toHaveBeenCalled();
  });
});
