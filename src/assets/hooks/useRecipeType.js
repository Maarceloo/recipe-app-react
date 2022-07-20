import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useRecipeType() {
  const { location, listen } = useHistory();
  const [pathChanged, setPathChanged] = useState(location);

  listen((newLocation) => setPathChanged(newLocation));

  return useMemo(
    () => (pathChanged.pathname.includes('foods') ? 'Meal' : 'Drink'), [pathChanged],
  );
}
