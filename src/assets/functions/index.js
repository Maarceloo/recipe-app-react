export const pushToJSONArray = (jsonArr, value) => {
  const parsed = JSON.parse(jsonArr);
  parsed.push(value);
  return JSON.stringify(parsed);
};

export const dummy = '';
