import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from './helpers/renderWithRouter';
import { foodDetailed, drinkDetailed } from './mocks/RECIPE_DETAILS_RESPONSE';
import drinks from './mocks/DRINKS_NO_NAME_RESPONSE.json';

test('1', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(foodDetailed),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(drinks),
  });

  const teste = renderWithRouter(RecipeDetails, {
    route: '/foods/55772',
    path: '/foods/:id',
  });
  const { history } = teste;

  expect(fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=55772',
  );

  await waitFor(() => {
    screen.getAllByRole('listitem');
  });

  expect(screen.getAllByAltText(foodDetailed.meals[0].strMeal)[0].src).toBe(
    foodDetailed.meals[0].strMealThumb,
  );

  expect(screen.getByTestId('recipe-category').textContent).toBe('Chicken');

  userEvent.click(screen.getByTestId('start-recipe-btn'));

  expect(history.location.pathname).toBe('/foods/55772/in-progress');
});
