import _ from 'lodash';
import parser from './parser.js';

const getDiff = (object1, object2) => {
  const constructObject = (key, type, value) => ({ key, type, value });
  const constructChangedObject = (key, type, oldValue, newValue) => ({
    key, type, oldValue, newValue,
  });
  const constructChildren = (key, type, children) => ({ key, type, children });

  const createDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const allKeys = keys1.concat(keys2);
    const uniqKeys = _.uniq(allKeys);
    const sortedKeys = uniqKeys.sort();

    const map = sortedKeys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return constructChildren(key, 'unchanged', createDiff(obj1[key], obj2[key]));
      }
      // если в первом объекте есть ключ, во втором нет
      if (!_.has(obj2, key)) return constructObject(key, 'removed', obj1[key]);
      // если во втором объекте есть ключ, в первом нет
      if (!_.has(obj1, key)) return constructObject(key, 'added', obj2[key]);
      // если ключ есть в обоих объектах
      if (_.isEqual(obj1[key], obj2[key])) return constructObject(key, 'unchanged', obj1[key]);
      // если значения разные
      return constructChangedObject(key, 'changed', obj1[key], obj2[key]);
    });
    return map;
  };
  return constructChildren('/', 'root', createDiff(object1, object2));
};

const returnDiff = (file1, file2) => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const result = JSON.stringify(getDiff(obj1, obj2), null, 2);
  return result;
};

export default returnDiff;
