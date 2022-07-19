import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncEffect } from '../assets/hooks';
import AppContext from '.';
import { fetchData } from '../assets/api';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [filters, setFilters] = useState({
    searchOption: '', // s = name, f = first letter, i = ingredient, c = category;
    queryText: '',
    recipeType: '',
  });
  const [recipies, setRecipies] = useState([]);

  const updateFilters = ({ searchOption, queryText, recipeType }) => {
    setFilters({
      searchOption,
      queryText,
      recipeType,
    });
  };

  useAsyncEffect(async () => {
    if (!filters.searchOption) return;
    const recipiesToSet = await fetchData.get(filters);
    setRecipies(recipiesToSet);
  }, [filters]);

  return (
    <AppContext.Provider value={ { recipies, updateFilters, setPageTitle, pageTitle } }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
