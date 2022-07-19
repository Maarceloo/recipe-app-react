import React, { useContext, useEffect, useState, useMemo } from 'react';
import AppContext from '../context';
import useRecipeType from '../assets/hooks/useRecipeType';
import SimpleCard from '../components/SimpleCard';

import parseRecipe from '../assets/functions/parseRecipe';
import { fetchData } from '../assets/api';
import { useAsyncEffect } from '../assets/hooks';

const RECIPIES_LIMIT = 12;
const CATEGORY_LIMIT = 5;

const Recipes = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { updateFilters, recipies } = useContext(AppContext);
  const recipeType = useRecipeType();

  const fetchDefault = () => {
    updateFilters({ searchOption: 'byName', recipeType, queryText: '' });
  };

  useEffect(() => {
    fetchDefault();
  }, []);

  useAsyncEffect(async () => {
    setCategoryList(await fetchData.categoryList({ recipeType }));
  }, [recipeType]);

  const cutRecipies = useMemo(() => recipies.slice(0, RECIPIES_LIMIT), [recipies]);

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
          cutRecipies.map((recipe) => {
            const parsedRecipe = parseRecipe(recipe, recipeType);

            return (
              <SimpleCard
                key={ parsedRecipe.id }
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
