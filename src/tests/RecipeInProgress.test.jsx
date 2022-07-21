import { cleanup, screen, waitFor } from '@testing-library/react';
import foods from './mocks/FOODS_NO_NAME_RESPONSE.json';
import { drinkDetailed } from './mocks/RECIPE_DETAILS_RESPONSE';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';
import { mockLocalStorage } from './helpers/fakeLocalStorage';
import {
  PHOTO_TESTID,
  TITLE_TESTID,
  CATEGORY_TEXT_TESTID,
  INGRIDIENT_ONE_TESTID,
  INSTRUCTIONS_TEXT_TESTID,
  FAV_BTN_TESTID,
  SHARE_BTN_TESTID,
  FINISH_BTN_TESTID,
} from './helpers/detailsAndInProgressTestIds.json';
import parseToFav from '../assets/functions/parseToFav';

const drinkObj = drinkDetailed.drinks[0];
const DRINK_IMG_SRC = drinkObj.strDrinkThumb;
const DRINK_TITLE = drinkObj.strDrink;
const DRINK_CATEGORY = drinkObj.strAlcoholic;
const DRINK_INGREDIENT_1_NAME = drinkObj.strIngredient1;
const DRINK_INGREDIENT_1_AMOUNT = drinkObj.strMeasure1;
const INGRIDIENTS_LENGTH = 4;
const DRINK_INSTRUCTIONS = drinkObj.strInstructions;
const FAVORITE_MARGARITA_OBJ = parseToFav(drinkDetailed.drinks[0], 'Drink');

const FILLED_HEART_PATHNAME = `${window.origin}/blackHeartIcon.svg`;
const EMPTY_HEART_PATHNAME = `${window.origin}/whiteHeartIcon.svg`;
const MARGARITA_PATH = `${window.origin}/drinks/11007`;


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

const fakeSetUp = async () => {
  renderWithRouter(RecipeInProgress, {
    route: '/drinks/11007',
    path: '/drinks/:id',
  });
  await waitFor(() => { screen.getAllByRole('heading'); });
}

describe('Testes de receitas em progresso', () => {
  describe('1. Busca os elementos visíveis em página de drink e suas funcionalidades', () => {
    beforeEach(async () => {
      mockTwoAPIResponses(drinkDetailed, foods);
      await fakeSetUp();
    });
    afterEach(() => { localStorage.clear(); cleanup(); });
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
      expect(ingredientOne.textContent.includes(DRINK_INGREDIENT_1_NAME)).toBe(true);
      expect(ingredientOne.textContent.includes(DRINK_INGREDIENT_1_AMOUNT)).toBe(true);

      expect(allIngredients.length).toBe(INGRIDIENTS_LENGTH);

      expect(instructions).toBeInTheDocument();
      expect(instructions.textContent).toBe(DRINK_INSTRUCTIONS);
    });
    test('1.3. Testa se os botões estão visíveis e a funcionalidade dos mesmos', async () => {
      mockLocalStorage();
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
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(MARGARITA_PATH);

      expect(localStorage.getItem('favoriteRecipes')).toBe(null);
      expect(heartImageSRC).toBe(EMPTY_HEART_PATHNAME);

      userEvent.click(likeBtn);

      const parsedStorage = JSON.parse(localStorage.getItem('favoriteRecipes'))[0];

      expect(parsedStorage).toStrictEqual(FAVORITE_MARGARITA_OBJ);
      expect(likeBtn.firstChild.src).toBe(FILLED_HEART_PATHNAME);

      userEvent.click(likeBtn);

      expect(heartImageSRC).toBe(EMPTY_HEART_PATHNAME);
      expect(localStorage.getItem('favoriteRecipes')).toBe("[]")

      expect(finishBtn.disabled).toBe(true);
    });
  });
  // describe('2. testes da lista de ingredientes NA ROTA FOODS, ao final, o finish btn deve funcionar', () =>{
  //   test('2.1. quantidade, visibilidade, texto e tipo', () => {
  //   });
  //   test('2.2. LocalStorage atualizando para adicionar e remover', () => {
  //   });
  //   test('2.3. marca itens e recarrega a pág. vê se os itens estão marcados', () => {
  //   })
  // })

  // describe('3. testes de finalização da receita, describe deve ser contínuo', () => {
  //   test('3.1. seleciona todos os checkboxes e vê se o finish btt está habilitado', () => {
  //   });
  //   test('3.2. finaliza a receita, o localStorage deve ter o id na chave dones:{TIPO?: }', () => {
  //   });
  //   test('3.3. verifica o redirecionamento', () => {
  //   });
  // })
});
