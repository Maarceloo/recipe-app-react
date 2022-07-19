import React, { useContext, useEffect } from 'react';
import AppContext from '../context';

const DoneRecipes = () => {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Done Recipes');
  }, []);

  return (
    <div>DoneRecipes</div>
  );
};

export default DoneRecipes;
