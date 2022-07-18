import { useEffect } from 'react';
import { pushToJSONArray } from '../functions';

export const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    effect();
  }, deps);
};

export const changeLocalStorage = (key, value, computeType) => {
  console.log('chamou');
  if (!key) return localStorage.clear();

  const opType = value !== undefined ? 'set' : 'get';
  const localItem = localStorage.getItem(key);
  const localToObj = JSON.parse(localItem);

  if (opType === 'get') return localToObj;

  const compute = {
    replace: () => value,
    arrayPush: () => pushToJSONArray(localItem, value),
    arrayRemove: () => removeFromJSONArray(localItem, value),
    setUser: () => {
      const user = { email: value };
      return JSON.stringify(user);
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
