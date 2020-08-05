export const omit = (originalObject, keys = []) => {
  const newObject = {};
  const _keys = keys.map(key => key + '');
  for (const key in originalObject) {
    if (_keys.indexOf(key) >= 0) {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(originalObject, key)) {
      continue;
    }
    newObject[key] = originalObject[key];
  }
  return newObject;
};
