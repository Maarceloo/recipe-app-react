import React, { useContext, useEffect } from 'react';
import AppContext from '../context';
import useRecipeType from '../assets/hooks/useRecipeType';
import SimpleCard from '../components/SimpleCard';

import parseRecipe from '../assets/functions/parseRecipe';

const Recipes = () => {
  const { updateFilters, recipies } = useContext(AppContext);
  const recipeType = useRecipeType();

  useEffect(() => {
    updateFilters({ searchOption: 'byName', recipeType, queryText: '' });
  }, []);

  return (
    <div>
      {
        recipies.map((recipe) => {
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
  );
};

export default Recipes;
