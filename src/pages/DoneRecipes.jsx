import React, { useContext, useEffect } from 'react';
import AppContext from '../context';

const DoneRecipes = () => {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Done Recipes');
  }, []);

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn" onClick={ null }>All</button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ null }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ null }
      >
        Drinks

      </button>
    </div>
  );
};

export default DoneRecipes;
