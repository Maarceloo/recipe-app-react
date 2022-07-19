import useRecipeType from "../assets/hooks/useRecipeType";
import React from "react";
import renderWithRouter from "./helpers/renderWithRouter";
import RecipeDetails from "../pages/RecipeDetails";

test('1', () => {
  renderWithRouter(RecipeDetails, { path:''})
})