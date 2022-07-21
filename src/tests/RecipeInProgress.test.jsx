import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
import foods from './mocks/FOODS_NO_NAME_RESPONSE.json';
import drinks from './mocks/DRINKS_NO_NAME_RESPONSE.json';
import { drinkDetailed, foodDetailed } from './mocks/RECIPE_DETAILS_RESPONSE';
import {
  PHOTO_TESTID,
  TITLE_TESTID,
  CATEGORY_TEXT_TESTID,
  INGRIDIENT_ONE_TESTID,
  INSTRUCTIONS_TEXT_TESTID,
  FAV_BTN_TESTID,
  SHARE_BTN_TESTID,
  FINISH_BTN_TESTID,
} from './mocks/constants/detailsAndInProgressTestIds.json';
import parseToFav from '../assets/functions/parseToFav';

const drinkObj = drinkDetailed.drinks[0];
const DRINK_IMG_SRC = drinkObj.strDrinkThumb;
const DRINK_TITLE = drinkObj.strDrink;
const DRINK_CATEGORY = drinkObj.strAlcoholic;
const DRINK_INGREDIENT_1_NAME = drinkObj.strIngredient1;
const DRINK_INGREDIENT_1_AMOUNT = drinkObj.strMeasure1;
const MARGARITA_INGRIDIENTS_LENGTH = 4;
const DRINK_INSTRUCTIONS = drinkObj.strInstructions;
const FAVORITE_MARGARITA_OBJ = parseToFav(drinkDetailed.drinks[0], 'Drink');

const FILLED_HEART_PATHNAME = `${window.origin}/blackHeartIcon.svg`;
const EMPTY_HEART_PATHNAME = `${window.origin}/whiteHeartIcon.svg`;
const MARGARITA_PATH = `${window.origin}/drinks/11007`;

const foodObj = foodDetailed.meals[0]
const CASSEROLE_INGREDIENTS_LENGTH = 9;
const CASSEROLE_INGREDIENT_1_NAME = foodObj.strIngredient1;
const CASSEROLE_INGREDIENT_2_NAME = foodObj.strIngredient2;

const mockTwoAPIResponses = (value1, value2) => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(value1),
    })
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(value2),
    });
};

const fakeSetUp = async (component, route, path) => {
  const container = renderWithRouter(component, {
    route,
    path,
  });
  await waitFor(() => {
    screen.getAllByRole('heading');
  });
  return container;
};

describe('Testes de receitas em progresso', () => {
  describe('1. Busca os elementos visíveis em página de drink e suas funcionalidades', () => {
    beforeEach(async () => {
      mockTwoAPIResponses(drinkDetailed, foods);
      await fakeSetUp(RecipeInProgress, '/drinks/11007', '/drinks/:id');
    });
    afterEach(() => cleanup());

    test('1.1. Testa a visibilidade e fonte da imagem da receita', async () => {
      const recipeIMG = screen.getByTestId(PHOTO_TESTID);

      expect(recipeIMG).toBeInTheDocument();
      expect(recipeIMG.src).toBe(DRINK_IMG_SRC);
    });

    test('1.2. Testa visibilidade dos elementos textuais e se buscam os textos corretos', async () => {
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
      expect(ingredientOne.textContent.includes(DRINK_INGREDIENT_1_NAME)).toBe(
        true
      );
      expect(
        ingredientOne.textContent.includes(DRINK_INGREDIENT_1_AMOUNT)
      ).toBe(true);

      expect(allIngredients.length).toBe(MARGARITA_INGRIDIENTS_LENGTH);

      expect(instructions).toBeInTheDocument();
      expect(instructions.textContent).toBe(DRINK_INSTRUCTIONS);
    });
    test('1.3. Testa se os botões estão visíveis e a funcionalidade dos mesmos', async () => {
      global.navigator.clipboard = { writeText: jest.fn() };

      const shareBtn = screen.getByTestId(SHARE_BTN_TESTID);
      const likeBtn = screen.getByTestId(FAV_BTN_TESTID);
      const heartImageSRC = likeBtn.firstChild.src;
      const finishBtn = screen.getByTestId(FINISH_BTN_TESTID);

      expect(shareBtn).toBeInTheDocument();
      expect(likeBtn).toBeInTheDocument();
      expect(finishBtn).toBeInTheDocument();

      userEvent.click(shareBtn);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        MARGARITA_PATH
      );

      expect(localStorage.getItem('favoriteRecipes')).toBe(null);
      expect(heartImageSRC).toBe(EMPTY_HEART_PATHNAME);

      userEvent.click(likeBtn);

      const parsedStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes')
      )[0];

      expect(parsedStorage).toStrictEqual(FAVORITE_MARGARITA_OBJ);
      expect(likeBtn.firstChild.src).toBe(FILLED_HEART_PATHNAME);

      userEvent.click(likeBtn);

      expect(heartImageSRC).toBe(EMPTY_HEART_PATHNAME);
      expect(localStorage.getItem('favoriteRecipes')).toBe('[]');

      expect(finishBtn.disabled).toBe(true);
    });
  });

  describe('2. Testes da lista de ingredientes na rota foods', () => {
    beforeEach(() => {
      localStorage.clear();
      mockTwoAPIResponses(foodDetailed, drinks);
    });
    afterEach(() => cleanup());
    test('2.1. Testa se existe uma checkbox para cada ingrediente, com o nome e a quantidade do mesmo aparente', async () => {
      await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');
      const ingredientsBoxes = screen.getAllByRole('checkbox');
      const ingredientsNodes = ingredientsBoxes.map((_, i) =>
        screen.getByTestId(`${i}-ingredient-step`)
      );

      expect(ingredientsBoxes.length === ingredientsNodes.length).toBe(true);
      expect(ingredientsBoxes.length).toBe(CASSEROLE_INGREDIENTS_LENGTH);

      ingredientsNodes.forEach((ingredient, i) => {
        const name = foodDetailed.meals[0][`strIngredient${i + 1}`];
        const mesure = foodDetailed.meals[0][`strMeasure${i + 1}`];

        expect(ingredient.textContent.includes(name)).toBe(true);
        expect(ingredient.textContent.includes(mesure)).toBe(true);
      });
    });
    test('2.2. Testa se cada checkbox é marcada e é salvo o ingrediente no localStorage,', async () => {
      const page = await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');
      const initialStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      
      expect(initialStorage.meals[52772]).toEqual([]);
      
      const ingredients = screen.getAllByRole('checkbox');
      ingredients.forEach((ing) => {
        expect(ing.checked).toBe(false);         
      });      
      
      userEvent.click(ingredients[0]);
      userEvent.click(ingredients[1]);

      const updatedStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

      expect(updatedStorage.meals[52772].some((ing) => ing.includes(CASSEROLE_INGREDIENT_1_NAME))).toBe(true);
      expect(updatedStorage.meals[52772].some((ing) => ing.includes(CASSEROLE_INGREDIENT_2_NAME))).toBe(true);
      expect(ingredients[0].checked).toBe(true);
      expect(ingredients[1].checked).toBe(true);

      page.unmount();

      const finalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

      expect(finalStorage.meals[52772].some((ing) => ing.includes(CASSEROLE_INGREDIENT_1_NAME))).toBe(true);
      expect(finalStorage.meals[52772].some((ing) => ing.includes(CASSEROLE_INGREDIENT_2_NAME))).toBe(true);   
    });
    test('2.3. Testa se fornecido um storage com o ingrediente salvo, a checkBox é renderiza selecionada', async () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { '52772': [ 'soy sauce', 'water' ] }, cocktails: {} }));

      await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');

      const ingredients = screen.getAllByRole('checkbox');

      expect(ingredients[0].checked).toBe(true)
      expect(ingredients[1].checked).toBe(true)      
    });
  });

  describe('3. testes de finalização da receita, describe deve ser contínuo', () => {
    beforeEach(() => {
      mockTwoAPIResponses(foodDetailed, drinks);
      localStorage.setItem('inProgressRecipes', JSON.stringify({"meals":{"52772":["soy sauce","water","brown sugar","ground ginger","minced garlic","cornstarch","chicken breasts","stir-fry vegetables","brown rice"]},"cocktails":{}}));
      localStorage.setItem('doneRecipes', '[]');
    });
    afterEach(() => cleanup());
    test('3.1. Testa se selecionas todas as checkboxes, o finish-btt está habilitado', async () => {
      await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');

      const btn = screen.getByTestId(FINISH_BTN_TESTID);

      expect(btn.disabled).toBe(false);
    });
    test('3.2. Testa se finalizada a receita, o localStorage deve ter um objeto com o id 52772 na chave doneRecipes',async () => {
      await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');

      const btn = screen.getByTestId(FINISH_BTN_TESTID);

      userEvent.click(btn);

      const doneKey = JSON.parse(localStorage.getItem('doneRecipes'));

      expect(doneKey.some((recipe) => recipe.id === '52772')).toBe(true);
    });
    test('3.3. Testa se ao final da receita, o usuário é redirecionado para o caminho "/done-recipes"', async () => {
      const { history } = await fakeSetUp(RecipeInProgress, '/foods/52772/in-progress', '/foods/:id/in-progress');

      const btn = screen.getByTestId(FINISH_BTN_TESTID);

      userEvent.click(btn);

      expect(history.location.pathname).toBe('/done-recipes');
    });
  })
});
