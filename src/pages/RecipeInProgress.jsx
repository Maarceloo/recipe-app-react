import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchData } from '../assets/api';
import { mapIngredients } from '../assets/functions';
import { useAsyncEffect, changeLocalStorage } from '../assets/hooks';
import useRecipeType from '../assets/hooks/useRecipeType';

const RecipeDetails = () => {
  // busca caminho da URL
  const {
    params: { id },
  } = useRouteMatch();
  // seta os estados do componente
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [usedIng, setUsedIng] = useState([]);
  // busca os tipos
  const recipeType = useRecipeType();
  const localStgType = recipeType === 'Meal' ? 'meals' : 'cocktails';

  // uso do localStorage
  const donesKey = changeLocalStorage('doneRecipes');
  const progKey = changeLocalStorage('inProgressRecipes');

  // checa se receita já foi feita ou se já foi iniciada
  const checkDone = donesKey && donesKey.some((done) => done.id === id);
  const checkProg = progKey && progKey[localStgType] && progKey[localStgType][id]
    ? progKey[localStgType][id]
    : false;

  // 'willMount'
  useAsyncEffect(async () => {
    // busca receita pelo id
    const actual = await fetchData.detail({ recipeType, id });
    setRecipe(actual[0]);
    setIngredients(mapIngredients(actual[0]).filter((ing) => ing.name !== ''));
  }, []);

  useEffect(() => {
    // busca localStorage e popula o estado usedIng
    changeLocalStorage(
      'inProgressRecipes',
      JSON.stringify({ meals: {}, cocktails: {} }),
      'replace',
    );
    if (checkProg) {
      setUsedIng(checkProg);
    }
  }, []);

  useEffect(() => {
    changeLocalStorage(
      'inProgressRecipes',
      { type: localStgType, id, ingredients: usedIng },
      'updateProgress',
    );
  }, [usedIng]);

  const checkIngredient = (name) => usedIng.some((ingred) => ingred === name);

  const handleClick = ({ target }) => (target.checked
    ? setUsedIng((old) => [...old, target.value])
    : setUsedIng((old) => old.filter((name) => name !== target.value)));

  return (
    <div className="recipe-wrapper" data-testid="recipe-wrapper">
      <section>
        <img
          src={ recipe[`str${recipeType}Thumb`] }
          alt={ recipe[`str${recipeType}`] }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h2>
        <button data-testid="share-btn" type="button" onClick={ null }>
          Compartilhar
        </button>
        <button data-testid="favorite-btn" type="button" onClick={ null }>
          Favoritar
        </button>
        <p data-testid="recipe-category">
          {recipeType === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        {ingredients.length
          && ingredients.map((ingredient, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ index }
                value={ ingredient.name }
                onChange={ handleClick }
                checked={ checkIngredient(ingredient.name) }
              />
              {`${ingredient.name} - ${ingredient.amount}`}
            </p>
          ))}
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      {!checkDone && (
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ null }
          className="final-button"
        >
          Finalizar
        </button>
      )}
    </div>
  );
};

export default RecipeDetails;
