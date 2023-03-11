import _ from 'lodash';
import parser from './parser.js';

const getDiff = (object1, object2) => {
  const constructObject = (key, type, value) => ({ key, type, value });
  const constructChildren = (key, type, child1, child2) => ({
    key, type, child1, child2,
  });
  const createDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const allKeys = keys1.concat(keys2);
    const uniqKeys = _.uniq(allKeys);
    const sortedKeys = uniqKeys.sort();

    const resultPush = sortedKeys.map((key) => {
      if (_.isObject(obj1[key]) || _.isObject(obj2[key])) {
        return (constructChildren(key, 'parent', createDiff(obj1[key], obj2[key])));
      }
      // если в первом объекте есть ключ, во втором нет
      if (!_.has(obj2, key)) return constructObject(key, 'removed', obj1[key]);
      // если во втором объекте есть ключ, в первом нет
      if (!_.has(obj1, key)) return constructObject(key, 'added', obj2[key]);
      // если ключ есть в обоих объектах
      if (_.has(obj1, key) && _.has(obj2, key)) {
      // если значения совпадают
        if (_.isEqual(obj1[key], obj2[key])) return constructObject(key, 'unchanged', obj1[key]);
        // если значения разные
        return constructObject(key, 'changed', obj1[key]);
      }
      return resultPush;
    });
  };
  return createDiff(object1, object2);
};

const returnDiff = (file1, file2) => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  return getDiff(obj1, obj2);
};

export default returnDiff;
