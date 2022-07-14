import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncEffect } from '../assets/hooks';
import AppContext from '.';

function Provider({ children }) {
  const [filters, setFilters] = useState({
    searchOption: '', // s = name, f = first letter, i = ingredient, c = category;
    queryText: '',
    recipeType: '',
  });
  const [recipies, setRecipies] = useState([]);

  const updateFilters = () => {
    setFilters();
  };

  useAsyncEffect(async () => {
    setRecipies([]);
  }, [filters]);

  return (
    <AppContext.Provider value={ { recipies, updateFilters } }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
