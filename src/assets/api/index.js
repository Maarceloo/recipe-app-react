export const dummy = '';

const getQueryPath = (searchOption) => {
  const options = {
    byName: 'search.php?s=',
    byFirstLetter: 'search.php?f=',
    byIngredient: 'filter.php?i=',
    byCategory: 'filter.php?c=',
    byId: 'lookup.php?i=',
    getCategoryList: 'list.php?c=',
  };

  return options[searchOption];
};

const getUrl = (recipeType) => {
  if (recipeType === 'Meal') return 'https://www.themealdb.com/api/json/v1/1/';
  if (recipeType === 'Drink') return 'https://www.thecocktaildb.com/api/json/v1/1/';
};

const computeFetch = async ({ searchOption, recipeType, queryText }) => {
  try {
    const res = await fetch(
      `${getUrl(recipeType)}${getQueryPath(searchOption)}${queryText}`,
    );

    const data = await res.json();
    return Object.values(data)[0] || [];
  } catch (error) {
    console.error(error);
    return ['Not Found'];
  }
};

export const fetchData = {
  get: async (params) => computeFetch(params),
  detail: async ({ recipeType, id }) => computeFetch({
    recipeType,
    searchOption: 'byId',
    queryText: id,
  }),
  categoryList: async ({ recipeType }) => computeFetch(
    {
      recipeType,
      searchOption: 'getCategoryList',
      queryText: 'list',
    },
  ),
};
