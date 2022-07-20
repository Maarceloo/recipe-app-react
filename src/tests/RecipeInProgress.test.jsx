import { cleanup, screen, waitFor } from '@testing-library/react';
import foods from './mocks/FOODS_NO_NAME_RESPONSE.json';
import { drinkDetailed } from './mocks/RECIPE_DETAILS_RESPONSE';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
import {
  PHOTO_TESTID,
  TITLE_TESTID,
  CATEGORY_TEXT_TESTID,
  INGRIDIENT_ONE_TESTID,
  INSTRUCTIONS_TEXT_TESTID,
} from './helpers/detailsAndInProgressTestIds.json';

const drinkObj = drinkDetailed.drinks[0];
const DRINK_IMG_SRC = drinkObj.strDrinkThumb;
const DRINK_TITLE = drinkObj.strDrink;
const DRINK_CATEGORY = drinkObj.strAlcoholic;
const DRINK_INGREDIENT_1_NAME = drinkObj.strIngredient1;
const DRINK_INGREDIENT_1_AMOUNT = drinkObj.strMeasure1;
const INGRIDIENTS_LENGTH = 4;
const DRINK_INSTRUCTIONS = drinkObj.strInstructions;

describe('Testes de receitas em progresso', () => {
  describe('1. Busca os elementos visíveis', () => {
    beforeEach(() => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(drinkDetailed),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(foods),
        });
    });
    afterEach(() => cleanup());
    test('1.1. Testa a visibilidade e fonte da imagem da receita', async () => {
      renderWithRouter(RecipeInProgress, {
        route: '/drinks/11007',
        path: '/drinks/:id',
      });
      await waitFor(() => { screen.getAllByRole('heading'); });

      const recipeIMG = screen.getByTestId(PHOTO_TESTID);

      expect(recipeIMG).toBeInTheDocument();
      expect(recipeIMG.src).toBe(DRINK_IMG_SRC);
    });
    test('1.2. Testa visibilidade dos elementos textuais e se buscam os textos corretos',
      async () => {
        renderWithRouter(RecipeInProgress, {
          route: '/drinks/11007',
          path: '/drinks/:id',
        });
        await waitFor(() => { screen.getAllByRole('heading'); });

        const title = screen.getByTestId(TITLE_TESTID);
        const category = screen.getByTestId(CATEGORY_TEXT_TESTID);
        const ingredientOne = screen.getByTestId(INGRIDIENT_ONE_TESTID);
        const instructions = screen.getByTestId(INSTRUCTIONS_TEXT_TESTID);
        const allIngredients = screen.getAllByRole('checkbox');

        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe(DRINK_TITLE);
        expect(category).toBeInTheDocument();
        expect(category.textContent).toBe(DRINK_CATEGORY);
        expect(ingredientOne).toBeInTheDocument();
        expect(ingredientOne.textContent.includes(DRINK_INGREDIENT_1_NAME)).toBe(true);
        expect(ingredientOne.textContent.includes(DRINK_INGREDIENT_1_AMOUNT)).toBe(true);
        expect(allIngredients.length).toBe(INGRIDIENTS_LENGTH);
        expect(instructions).toBeInTheDocument();
        expect(instructions.textContent).toBe(DRINK_INSTRUCTIONS);
      });
  });
});
