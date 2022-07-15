import React, { useContext, useEffect } from 'react';
import AppContext from '../context';
import useRecipeType from '../assets/hooks/useRecipeType';

const Recipes = () => {
  const { updateFilters } = useContext(AppContext);
  const recipeType = useRecipeType();

  useEffect(() => {
    updateFilters({ searchOption: 'byName', recipeType, queryText: '' });
  }, []);

  return (
    <div>Recipes</div>
  );
};

export default Recipes;
