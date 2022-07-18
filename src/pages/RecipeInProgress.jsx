import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const RecipeInProgress = () => {
  const {
    params: { id },
  } = useRouteMatch();
  return (
    <p>{id}</p>
  );
};

export default RecipeInProgress;
