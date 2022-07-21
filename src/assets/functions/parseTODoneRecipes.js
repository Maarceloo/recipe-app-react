export default function parseToDoneRecipes(recipe, recipeType) {
  const localStorageType = recipeType === 'Meal' ? 'food' : 'drink';
  const dataAutal = new Date();
  const date = `${dataAutal.getDate()}/${dataAutal.getMonth()
     + 1}/${dataAutal.getFullYear()}`;
  const listaTags = recipe.strTags === null ? [] : recipe.strTags.split(',');
  return {
    id: recipe[`id${recipeType}`],
    type: localStorageType,
    nationality: localStorageType === 'food' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: localStorageType === 'drink' ? recipe.strAlcoholic : '',
    name: recipe[`str${recipeType}`],
    image: recipe[`str${recipeType}Thumb`],
    doneDate: date,
    tags: listaTags,
  };
}
