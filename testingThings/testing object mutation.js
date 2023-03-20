import _ from 'lodash';

const obj = {
  key: null,
  type: 'root',
  children: [
    {
      key: 'common',
      type: 'unchanged',
      value: 'false',
    },
    {
      key: 'uncommon',
      type: 'added',
      value: {
        key: 'true',
        type: 'changed',
        value: 'something',
      },
    }],
};

const hasChildren = (object) => object.hasOwnProperty('children');
const constructor = (object) => {
  const constructObject = (key, type, value) => {
    if (type === 'added') return [`  + ${key}`, value];
    if (type === 'removed') return [`  - ${key}`, value];
    if (type === 'unchanged') return [`    ${key}`, value];
    if (type === 'changed') return [` so ${key}`, value];
  };
  const createNode = (object) => {
    const keyValue = object.key;
    if (hasChildren(object)) {
      object[keyValue] = Object.fromEntries(object.children.map((element) => {
        return constructObject(element.key, element.type, createNode(element.children));
      }));
    }
    return constructObject(keyValue, object.type, object.value);
  };
  return constructObject(object.key, object.type, object.children);
};
console.log(constructor(obj));
