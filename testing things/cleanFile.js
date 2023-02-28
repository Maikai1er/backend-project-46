import fs from 'fs';
import _ from 'lodash';

const filepath1 = '../filesToCompare/file1.json';
const filepath2 = '../filesToCompare/file2.json';

const obj1 = JSON.parse(fs.readFileSync(filepath1));
const obj2 = JSON.parse(fs.readFileSync(filepath2));

const keys1 = Object.keys(obj1);
const keys2 = Object.keys(obj2);

const allkeys = keys1.concat(keys2);

console.log(allkeys)

const uniqKeys = _.uniq(allkeys);

console.log(uniqKeys)

const sortedKeys = uniqKeys.sort()

console.log(sortedKeys)
