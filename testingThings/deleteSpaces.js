import fs from 'fs';
import _ from 'lodash';

const object = JSON.parse(fs.readFileSync('../__fixtures__/diff.json'));

const constructor = (obj) => {
  const constructKey = (key, type) => {
    if (type === 'added') return `+ ${key}`;
    if (type === 'removed') return `- ${key}`;
    // unnecessary, to remove
    if (type === 'unchanged') return `  ${key}`;
    return `  ${key}`;
  };
  const constructChangedKey = (changedKey, valueType) => {
    if (valueType === 'old') return `- ${changedKey}`;
    if (valueType === 'new') return `+ ${changedKey}`;
  };
  const result = {};
  for (let i = 0; i < obj.children.length; i += 1) {
    const { key, type } = obj.children[i];
    let newKey;
    if (type === 'changed') {
      const { oldValue, newValue } = obj.children[i];
      let valueType = 'old';
      const newKey1 = constructChangedKey(key, valueType);
      result[newKey1] = oldValue;
      valueType = 'new';
      const newKey2 = constructChangedKey(key, valueType);
      result[newKey2] = newValue;
    } else {
      const { value } = obj.children[i];
      // if (_.isObject(value)) constructor(value);
      newKey = constructKey(key, type);
      result[newKey] = value;
    }
    if (obj.children[i].hasOwnProperty('children')) {
      result[newKey] = constructor(obj.children[i]);
    }
  }
  return result;
};
const result = JSON.stringify(constructor(object), null, '  ');
const finalResult = result.replaceAll('"', '').replaceAll(',', '');

const trimmed = (string) => {
  const coll = string.split('\n');
  return coll.map((element) => element.trim());
};

console.log(trimmed(finalResult).join('\n'));
