import React from 'react';
import { screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from './helpers/renderWithRouter';

test('1', () => {
  renderWithRouter(<RecipeDetails />);

  expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
});
