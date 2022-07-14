import { useEffect } from 'react';
import { pushToJSONArray } from '../functions';

export const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    effect();
  }, deps);
};

export const useLocalStorage = (key, value, computeType) => {
  if (!key) return localStorage.clear();

  const opType = value !== undefined ? 'set' : 'get';
  const localItem = localStorage.getItem(key);
  const localToObj = JSON.parse(localItem);

  if (opType === 'get') return localToObj;

  const compute = {
    replace: () => value,
    arrayPush: () => pushToJSONArray(localItem, value),
    setUser: () => {
      localToObj.email = value;
      return JSON.stringify(localToObj);
    },
    updateProgress: () => {
      const modifiedObj = {
        ...localToObj,
        [value.type]: {
          ...localToObj[value.type],
          [value.id]: value.ingredients,
        },
      };
      return JSON.stringify(modifiedObj);
    },
    deleteProgress: () => {
      delete localToObj[value.type][value.id];
      return JSON.stringify(localToObj);
    },
  };

  localStorage.setItem(key, compute[computeType]());
};
