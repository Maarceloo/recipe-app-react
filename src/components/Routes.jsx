import { Route } from 'react-router-dom';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import Recipes from '../pages/Recipes';

import Header from './Header';
import Footer from './Footer';

const Routes = () => (
  <>
    <Route exact path="/">
      <Login />
    </Route>
    <Route exact path={ ['/foods', '/drinks'] }>
      <Header />
      <Recipes />
      <Footer />
    </Route>
    <Route exact path={ ['/foods/:id', '/drinks/:id'] }>
      <RecipeDetails />
    </Route>
    <Route path={ ['/foods/:id/in-progress', '/drinks/:id/in-progress'] }>
      <RecipeInProgress />
    </Route>
    <Route path="/done-recipes">
      <Header />
      <DoneRecipes />
    </Route>
    <Route path="/favorite-recipes">
      <Header />
      <FavoriteRecipes />
    </Route>
    <Route path="/profile">
      <Header />
      <Profile />
      <Footer />
    </Route>
  </>
);

export default Routes;
