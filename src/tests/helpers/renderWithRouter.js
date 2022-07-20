import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../context/Provider';
import AppContext from '../../context';

const renderWithRouter = (
  Component,
  histOpt = {},
) => {
  const baseProviderValue = { recipes: [], updateFilters: () => {}, setPageTitle: () => {}, pageTitle: '' }

  const getInitialEntries = () => {
    if (!histOpt.initialEntries && histOpt.route) {
      return [histOpt.route];
    }
    if (histOpt.initialEntries) {
      return [histOpt.initialEntries];
    }
    return ['/'];
  };

  const history = createMemoryHistory({
    initialEntries: getInitialEntries(),
  });
  return {
    ...render(
      <Router history={ history }>
        <AppContext.Provider value={{...baseProviderValue, ...histOpt.providerValue}}>
          <Route
            render={ (props) => <Component { ...props } /> }
            path={ histOpt.path ? histOpt.path : '' }
          />
        </AppContext.Provider>
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;