import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchData } from '../assets/api';
import { useAsyncEffect } from '../assets/hooks';
import useRecipeType from '../assets/hooks/useRecipeType';
import { getYoutubeEmbedURL, mapIngredients } from '../assets/functions/index';
import SimpleCard from '../components/SimpleCard';

const RecipeDetails = () => {
  // busca caminho da URL
  const {
    params: { id },
  } = useRouteMatch();
  // seta os estados do componente
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [sugestions, setSugestions] = useState([]);
  // busca os tipos
  const recipeType = useRecipeType();
  const sugestionsType = recipeType === 'Meal' ? 'Drink' : 'Meal';
  // declara constantes usadas somente aqui
  const desiredSugestionsAmount = 6;

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
    <>
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
      <aside data-testid="recomendation-card">
        {sugestions.map((sugRec, i) => (
          <SimpleCard
            testid={ `${i}-recomendation-card` }
            key={ sugRec.strId }
            thumb={ sugRec[`str${sugestionsType}Thumb`] }
            name={ sugRec[`str${sugestionsType}`] }
          />
        ))}
      </aside>
    </>
  );
};

export default RecipeDetails;
