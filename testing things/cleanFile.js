import fs from 'fs';
import _ from 'lodash';

const filepath1 = '../filesToCompare/file1.json';
const filepath2 = '../filesToCompare/file2.json';

const obj1 = JSON.parse(fs.readFileSync(filepath1));
const obj2 = JSON.parse(fs.readFileSync(filepath2));

const keys1 = Object.keys(obj1);
const keys2 = Object.keys(obj2);

const allkeys = keys1.concat(keys2);

const uniqKeys = _.uniq(allkeys);

const sortedKeys = uniqKeys.sort();

console.log(sortedKeys);
const result = [];

const resultPush = sortedKeys.map((key) => {
  //если в первом объекте есть ключ, во втором нет
  if (_.has(obj1, key) && !_.has(obj2, key)) result.push(`${key}: ${obj1[key]}`);
  //если во втором объекте есть ключ, в первом нет
  if (!_.has(obj1, key) && _.has(obj2, key)) result.push(`${key}: ${obj2[key]}`);
  //если ключ есть в обоих объектах
  if (_.has(obj1, key) && _.has(obj2, key)) {
    if (_.isEqual(obj1[key], obj2[key])) result.push(`${key}: ${obj1[key]}`);
    else {
      result.push(`${key}: ${obj1[key]}`)
      result.push(`${key}: ${obj2[key]}`)
    }
  }
})

console.log(result);
