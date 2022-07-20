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
  const entries = Object.entries(obj);
  const names = entries.filter(
    (entrie) => entrie[0].match(/strIngredient\d/) && entrie[1] !== null,
  );
  const amounts = entries.filter((entrie) => entrie[0].match(/strMeasure\d/));
  return names.reduce((final, ingredient, i) => {
    final.push({ name: ingredient[1], amount: amounts[i][1] });
    return final;
  }, []);
};

export const getYoutubeEmbedURL = (URLstring) => {
  const baseUrl = 'https://www.youtube.com/watch?v=';
  return `https://www.youtube.com/embed/${URLstring.substring(
    baseUrl.length,
    URLstring.length,
  )}/`;
};

export const dummy = '';
