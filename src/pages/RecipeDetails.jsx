import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { fetchData } from '../assets/api';
import { useAsyncEffect, useLocalStorage } from '../assets/hooks';
import useRecipeType from '../assets/hooks/useRecipeType';
import { getYoutubeEmbedURL, mapIngredients } from '../assets/functions/index';
import SugestionsCarousel from '../components/SugestionsCarousel';

const RecipeDetails = () => {
  // busca caminho da URL
  const {
    params: { id },
  } = useRouteMatch();
  const { push } = useHistory();
  // seta os estados do componente
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [sugestions, setSugestions] = useState([]);
  // busca os tipos
  const recipeType = useRecipeType();
  const sugestionsType = recipeType === 'Meal' ? 'Drink' : 'Meal';
  const storageRecipeTypes = recipeType === 'Meal' ? 'meals' : 'cocktails';
  const pathTypes = recipeType === 'Meal' ? 'foods' : 'drinks';
  // declara constantes usadas somente aqui
  const desiredSugestionsAmount = 6;
  // uso do localStorage
  const donesKey = useLocalStorage('doneRecipes');
  const progKey = useLocalStorage('inProgressRecipes');
  // checa se receita já foi feita ou se já foi iniciada
  const checkDone = donesKey && donesKey.some((done) => done.id === id);
  const checkProgress = progKey
    && progKey[storageRecipeTypes]
    && Object.keys(progKey[storageRecipeTypes]).includes(`${id}`);

  // 'willMount'
  useAsyncEffect(async () => {
    // busca receita pelo id
    const actual = await fetchData.detail({ recipeType, id });
    setRecipe(actual[0]);
    setIngredients(mapIngredients(actual[0]).filter((ing) => ing.name !== ''));

    // busca sugestões de receitas
    const sugestionFetch = await fetchData.get({
      searchOption: 'byName',
      recipeType: sugestionsType,
      queryText: '',
    });
    setSugestions(sugestionFetch.filter((_, i) => i < desiredSugestionsAmount));
  }, []);

  // mapeia url de embed video
  const youtubeSrc = recipe.strMeal
    ? getYoutubeEmbedURL(recipe.strYoutube)
    : undefined;

  return (
    <div className="recipe-wrapper">
      {/* <div>
        <button type="button"
        data-testid=""
      </div> */}
      <section>
        <img
          src={ recipe[`str${recipeType}Thumb`] }
          alt={ recipe[`str${recipeType}`] }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h2>
        <p data-testid="recipe-category">
          {recipeType === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        <ol>
          {ingredients.length
            && ingredients.map((ingredient, index) => (
              <li
                key={ `${ingredient.name} mesure inList` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient.name} - ${ingredient.amount} `}
              </li>
            ))}
        </ol>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <iframe
            title="Recipe on Youtube"
            width="100%"
            src={ youtubeSrc }
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        )}
      </section>
      <aside className="carousel">
        <SugestionsCarousel sugestions={ sugestions } />
      </aside>
      {!checkDone && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => push(`/${pathTypes}/${id}/in-progress`) }
          className="final-button"
        >
          {checkProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
};

export default RecipeDetails;
