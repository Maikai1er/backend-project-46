import _ from 'lodash';
import parser from './parser.js';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = keys1.concat(keys2);

  const uniqKeys = _.uniq(allKeys);

  const sortedKeys = uniqKeys.sort();

  const resultPush = sortedKeys.reduce((acc, key) => {
    // если в первом объекте есть ключ, во втором нет
    if (_.has(obj1, key) && !_.has(obj2, key)) acc.push(`- ${key}: ${obj1[key]}`);
    // если во втором объекте есть ключ, в первом нет
    if (!_.has(obj1, key) && _.has(obj2, key)) acc.push(`+ ${key}: ${obj2[key]}`);
    // если ключ есть в обоих объектах
    if (_.has(obj1, key) && _.has(obj2, key)) {
      // если значения совпадают
      if (_.isEqual(obj1[key], obj2[key])) acc.push(`  ${key}: ${obj1[key]}`);
      // если значения разные
      else {
        acc.push(`- ${key}: ${obj1[key]}`);
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);

  const string = resultPush.join('\n  ');

  const result = `{ \n  ${string}\n}`;

  return result;
};

const returnDiff = (file1, file2) => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  return getDiff(obj1, obj2);
};

export default returnDiff;
