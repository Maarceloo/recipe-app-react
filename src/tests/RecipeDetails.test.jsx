import React from 'react';
import { screen, render } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';

test('1', () => {
  render(<RecipeDetails />);

  expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
});
