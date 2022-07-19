import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (
  Component,
  histOpt = {},
) => {
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
        <Route
          render={ (props) => <Component { ...props } /> }
          path={ histOpt.path ? histOpt.path : '' }
        />
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
