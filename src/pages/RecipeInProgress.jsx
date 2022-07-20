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

  // uso do localStorage -->
  // seta done caso não exista;
  const setDoneKey = () => changeLocalStorage('doneRecipes')
    || changeLocalStorage('doneRecipes', JSON.stringify([]), 'replace');
  setDoneKey();
  // referencia a chave sem bugs;
  const doneKey = changeLocalStorage('doneRecipes');
  // checa se a receita já foi concluída
  const checkDone = doneKey.some((done) => done.id === id);
  // seta Progress caso não exista
  const setInProgressKey = () => changeLocalStorage('inProgressRecipes')
    || changeLocalStorage(
      'inProgressRecipes',
      JSON.stringify({ meals: {}, cocktails: {} }),
      'replace',
    );
  setInProgressKey();
  // referencia progress sem bugs;
  const inProgressKey = changeLocalStorage('inProgressRecipes');
  // checa se receita já foi iniciada
  const checkProg = inProgressKey[localStgType][id]
    ? inProgressKey[localStgType][id]
    : [];
  // <-- uso do LocalStorage

  // 'willMount'
  useAsyncEffect(async () => {
    // busca receita pelo id
    const actual = await fetchData.detail({ recipeType, id });
    setRecipe(actual[0]);
    setIngredients(mapIngredients(actual[0]).filter((ing) => ing.name !== ''));
  }, []);

  useEffect(() => {
    // busca localStorage e popula o estado usedIng
    setUsedIng(checkProg);
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
