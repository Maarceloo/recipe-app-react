import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

export default function useRecipeType() {
  const { location: { pathname } } = useHistory();
  const recipeType = useMemo(
    () => (pathname === '/foods' ? 'Meal' : 'Drink'), [pathname],
  );

  return recipeType;
}
