export default function parseToFav(recipe, recipeType) {
  const localStorageType = recipeType === 'Meal' ? 'food' : 'drink';
  return {
    id: recipe[`id${recipeType}`],
    type: localStorageType,
    nationality: localStorageType === 'food' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: localStorageType === 'drink' ? recipe.strAlcoholic : '',
    name: recipe[`str${recipeType}`],
    image: recipe[`str${recipeType}Thumb`],
  };
}
