import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context';
import useRecipeType from '../assets/hooks/useRecipeType';
import SimpleCard from '../components/SimpleCard';

import parseRecipe from '../assets/functions/parseRecipe';
import { fetchData } from '../assets/api';
import { useAsyncEffect } from '../assets/hooks';

const RECIPES_LIMIT = 12;
const CATEGORY_LIMIT = 5;

const Recipes = () => {
  const history = useHistory();
  const isInitialMount = useRef(true);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { updateFilters, recipes, setPageTitle } = useContext(AppContext);
  const recipeType = useRecipeType();

  useEffect(() => {
    if (recipes.length !== 1) return;
    const typeUrl = recipeType === 'Meal' ? 'foods' : 'drinks';
    const recipe = parseRecipe(recipes[0], recipeType);
    const time = 200;
    setTimeout(() => {
      history.push(`/${typeUrl}/${recipe.id}`);
    }, time);
  }, [recipes]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (recipes.length === 0) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  const fetchDefault = () => {
    updateFilters({ searchOption: 'byName', recipeType, queryText: '' });
  };

  useEffect(() => {
    fetchDefault();
    setPageTitle(recipeType === 'Meal' ? 'Foods' : 'Drinks');
  }, [recipeType]);

  useAsyncEffect(async () => {
    setCategoryList(await fetchData.categoryList({ recipeType }));
  }, [recipeType]);

  const cutRecipes = useMemo(
    () => (Array.isArray(recipes) ? recipes.slice(0, RECIPES_LIMIT) : []),
    [recipes],
  );

  const cutCategories = useMemo(
    () => categoryList.slice(0, CATEGORY_LIMIT), [categoryList],
  );

  const updateCategories = (strCategory) => {
    if (selectedCategory === strCategory) {
      setSelectedCategory('');
      return fetchDefault();
    }

    updateFilters({ searchOption: 'byCategory', recipeType, queryText: strCategory });
    setSelectedCategory(strCategory);
  };

  return (
    <>
      <div>
        <button
          onClick={ () => updateCategories(selectedCategory) }
          type="button"
          data-testid="All-category-filter"
        >
          All
        </button>
        {cutCategories.map(({ strCategory }) => (
          <button
            onClick={ () => updateCategories(strCategory) }
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
      </div>
      <div>
        {
          cutRecipes.map((recipe, i) => {
            const parsedRecipe = parseRecipe(recipe, recipeType);
            if (parsedRecipe.id === undefined) return;

            return (
              <SimpleCard
                index={ i }
                testid={ `${i}-recipe-card` }
                key={ parsedRecipe.id }
                id={ parsedRecipe.id }
                recipeType={ recipeType }
                name={ parsedRecipe.name }
                thumb={ parsedRecipe.thumb }
              />
            );
          })
        }
      </div>
    </>
  );
};

export default Recipes;
