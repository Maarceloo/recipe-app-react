export const pushToJSONArray = (jsonArr, value) => {
  const parsed = JSON.parse(jsonArr);
  parsed.push(value);
  return JSON.stringify(parsed);
};

export const removeFromJSONArray = (jsonArr, id) => {
  const parsed = JSON.parse(jsonArr);
  const filtered = parsed.filter((item) => item.id !== id);
  return JSON.stringify(filtered);
};

export const mapIngredients = (obj) => {
  const ingredients = [];
  let entries = Object.entries(obj);
  entries = entries
    .filter((entry) => entry[0].match(/.*\d/)?.length > 0)
    .filter((entry) => entry[1] !== null);

  for (let i = 0; i < entries.length / 2; i += 1) {
    ingredients.push({
      name: entries[i][1],
      amount: entries[entries.length / 2 + i][1],
    });
  }

  return ingredients;
};

export const dummy = '';
