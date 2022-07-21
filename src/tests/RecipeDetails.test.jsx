import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { foodDetailed, drinkDetailed } from './mocks/RECIPE_DETAILS_RESPONSE';
import drinks from './mocks/DRINKS_NO_NAME_RESPONSE.json';
import foods from './mocks/FOODS_NO_NAME_RESPONSE.json';
import { changeLocalStorage } from '../assets/hooks';
import RecipeDetails from '../pages/RecipeDetails';

describe('1.Testa endpoints da página de detalhes da receita:', () => {
  afterEach(() => cleanup());
  test('1.1. Sendo carregada a rota "/drinks/11007"', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkDetailed),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foods),
      });
    renderWithRouter(RecipeDetails, {
      route: '/drinks/11007',
      path: '/drinks/:id',
    });
    await waitFor(() => {
      screen.getByTestId('0-recomendation-title');
    });
    expect(fetch.mock.calls[0][0]).toBe(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007',
    );
    expect(fetch.mock.calls[1][0]).toBe(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  });
  test('1.2. Sendo carregada a rota "/foods/55772"', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    renderWithRouter(RecipeDetails, {
      route: '/foods/52772',
      path: '/foods/:id',
    });
    await waitFor(() => {
      screen.getByTestId('0-recomendation-title');
    });
    expect(fetch.mock.calls[0][0]).toBe(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772',
    );
    expect(fetch.mock.calls[1][0]).toBe(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
  });
});

describe('2. Testa se os elementos da página estão visíveis disponíveis', () => {
  afterEach(() => cleanup());
  test('2.1. testa a visibilidade da imagem da receita', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
    renderWithRouter(RecipeDetails, {
      route: '/foods/52772',
      path: '/foods/:id',
    });
    await waitFor(() => {
      screen.getByRole('heading');
    });
    const recipeSRC = foodDetailed.meals[0].strMealThumb;

    const img = screen.getByTestId('recipe-photo');

    expect(img.src).toBe(recipeSRC);
  });
});

describe('3. Testes do botão de iniciar a receita', () => {
  afterEach(() => { changeLocalStorage(); cleanup(); });
  test('3.1. Testa se o botão não é renderizado caso a receita esteja feita',
    async () => {
      changeLocalStorage('doneRecipes', JSON.stringify([{ id: '52772' }]), 'replace');
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
      renderWithRouter(RecipeDetails, {
        route: '/foods/52772',
        path: '/foods/:id',
      });
      await waitFor(() => { screen.getByTestId('0-recomendation-title'); });
      const buttons = screen.getAllByRole('button');
      const startBttDisplayed = buttons.some(
        (btt) => btt.textContent === 'Start Recipe'
        || btt.textContent === 'Continue Recipe',
      );
      expect(startBttDisplayed).toBe(false);
    });
  test('3.2. Se uma receita já foi iniciada, o botão apresenta o texto "Continue Recipe"',
    async () => {
      await changeLocalStorage('inProgressRecipes', JSON.stringify({
        meals: { 52772: [] },
      }), 'replace');
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
      renderWithRouter(RecipeDetails, {
        route: '/foods/52772',
        path: '/foods/:id',
      });
      await waitFor(() => { screen.getByTestId('0-recomendation-title'); });
      const startBtt = screen.getByTestId('start-recipe-btn');
      expect(startBtt.textContent).toBe('Continue Recipe');
    });
  test('3.3. Se ao ser clicado o botão iniciar receita redireciona para a rota "/`type`/:id/in-progress"', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(foodDetailed),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { history } = renderWithRouter(RecipeDetails, {
      route: '/foods/52772',
      path: '/foods/:id',
    });
    await waitFor(() => { screen.getByTestId('0-recomendation-title'); });
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    expect(history.location.pathname).toBe('/foods/52772/in-progress');
  });
});

describe('4. testa os botões de compartilahr e favoritar', () => {
  afterEach(() => cleanup());

  test('4.1. clicado no botão de compartilhar, o alerta se torna visível',
    async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
      global.navigator.clipboard = { writeText: jest.fn(() => 'ola') };
      renderWithRouter(RecipeDetails, {
        route: '/foods/52772',
        path: '/foods/:id',
      });
      await waitFor(() => { screen.getByTestId('0-recomendation-title'); });

      const shareButton = screen.getByTestId('share-btn');

      expect(shareButton).toBeInTheDocument();

      userEvent.click(shareButton);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

  test('4.2. Se a imagem do botão de favoritar muda de acordo com o localStorage',
    async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(foodDetailed),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
      renderWithRouter(RecipeDetails, {
        route: '/foods/52772',
        path: '/foods/:id',
      });
      await waitFor(() => { screen.getByTestId('0-recomendation-title'); });

      const likeBtt = screen.getByTestId('favorite-btn');
      const emptyHeatSRC = screen.getByTestId('favorite-btn').firstChild.src;
      expect(emptyHeatSRC.includes('whiteHeartIcon.svg')).toBe(true);

      userEvent.click(likeBtt);
      const srcIncluded = [...likeBtt.children].some((node) => node.src.includes('blackHeartIcon.svg'));
      expect(srcIncluded).toBe(true);
    });
});