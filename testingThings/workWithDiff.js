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

const spaceCounter = (string) => {
  let result = '{';
  const stack = [];
  let indexOfPlus;
  let indexOfMinus;
  let spaceCounter = 2;
  const spaceIncreaser = 2;
  const toWorkWith = string.split('\n');
  const coll = toWorkWith.map((element) => {
    const temp = element.trim();
    const res = ['{', '+', '-'].some((word) => temp.startsWith(word));
    if (res) return temp;
    return `  ${temp}`;
  });
  for (let i = 1; i < coll.length - 1; i += 1) {
    if (spaceCounter < 0) spaceCounter = 0;
    result += `\n${' '.repeat(spaceCounter)}${coll[i]}`;
    indexOfMinus = coll[i].indexOf('-');
    indexOfPlus = coll[i].indexOf('+');
    if (coll[i].endsWith('{')) {
      if (indexOfPlus !== (-1) || indexOfMinus !== (-1)) {
        spaceCounter += spaceIncreaser * 2;
        stack.push('symbol');
      } else {
        spaceCounter += spaceIncreaser * 2;
        stack.push('blank');
      }
    }
    if (coll[i + 1].endsWith('}')) {
      (stack.pop() === 'symbol') ? (spaceCounter -= spaceIncreaser * 2) : (spaceCounter -= spaceIncreaser * 2);
    }
  }
  return `${result}\n}`;
};

console.log(spaceCounter(finalResult));
