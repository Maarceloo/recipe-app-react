import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

const RecipeInProgress = () => {
  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();
  return (
    <>
      <p>{id}</p>
      <p>{history.location.pathname}</p>
    </>
  );
};

export default RecipeInProgress;
