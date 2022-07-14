import { useEffect } from 'react';
import { pushToJSONArray } from '../functions';

export const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    effect();
  }, deps);
};

export const useLocalStorage = (key, value) => {
  const opType = value !== undefined ? 'set' : 'get';
  const localItem = localStorage.getItem(key);
  let dataToSet = null;

  if (opType === 'get') return JSON.parse(localItem);

  switch (key) {
  case 'doneRecipes':
  case 'favoriteRecipes':
    if (!localItem) {
      dataToSet = '[]';
      break;
    }

    pushToJSONArray(localItem, value);
    break;
  case 'inProgressRecipes': {
    if (!localItem) {
      dataToSet = '{ cocktails : {}, meals: {} }';
      break;
    }

    const localToObj = JSON.parse(localItem);
    const modifiedObj = {
      ...localToObj,
      [value.type]: {
        ...localToObj[value.type],
        [value.id]: value.ingredients,
      },
    };
    dataToSet = JSON.stringify(modifiedObj);
    break;
  }
  default:
    return;
  }

  localStorage.setItem(key, dataToSet);
};
