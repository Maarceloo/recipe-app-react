import { mapIngredients } from '.';

export default function parseRecipe(recipe, recipeType) {
  return {
    id: recipe[`id${recipeType}`],
    name: recipe[`str${recipeType}`],
    thumb: recipe[`str${recipeType}Thumb`],
    ingredients: mapIngredients(recipe),
  };
}
