export const fetchData = async ({
  searchOption,
  queryText,
  recipeType,
}) => {
  const url = recipeType === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

  const res = await fetch(`${url}/${searchOption}=${queryText}`);
  const data = await res.json();

  return data[recipeType];
};

export const dummy = '';
