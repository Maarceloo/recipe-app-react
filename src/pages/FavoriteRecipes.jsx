import React, { useContext, useEffect } from 'react';
import AppContext from '../context';

const FavoriteRecipes = () => {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Favorite Recipes');
  }, []);

  return (
    <div>FavoriteRecipes</div>
  );
};

export default FavoriteRecipes;
