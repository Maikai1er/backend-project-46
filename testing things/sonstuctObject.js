import fs from 'fs';

const obj = JSON.parse(fs.readFileSync('../__fixtures__/diff.json'));

const constructor = (obj) => {
  const constructKey = (key, type) => {
    if (type === 'added') return `+ ${key}`;
    if (type === 'removed') return `- ${key}`;
    return `  ${key}`;
  };
  const constructChangedKey = (changedKey, valueType) => {
    if (valueType === 'old') return `- ${changedKey}`;
    return `+ ${changedKey}`;
  };
  const constructObject = (key, value) => ({ key, value });
  const result = obj.children.map((element) => {
    const { key, type } = element;
    let newKey;
    if (type === 'changed') {
      const { oldValue, newValue } = element;
      let valueType = 'old';
      const newKey1 = constructChangedKey(key, valueType);
      return constructObject(newKey1, oldValue);
      valueType = 'new';
      const newKey2 = constructChangedKey(key, valueType);
      constructObject(newKey2, newValue);
    } else {
      const { value } = element;
      newKey = constructKey(key, type);
      return constructObject(newKey, value);
    }
    if (element.hasOwnProperty('children')) {
      return constructObject(newKey, constructor(element));
    }
  });
  return result;
};

console.log(constructor(obj));
