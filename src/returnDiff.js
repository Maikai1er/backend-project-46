import _ from 'lodash';
import parser from './parser.js';

const getDiff = (obj1, obj2) => {
  const commonArray = [];
  for (const key in obj1) {
    // Если ключ только в 1 объекте
    if (!Object.hasOwn(obj2, key)) commonArray.push(`${key}: ${obj1[key]}-`);
    // Если ключ в обоих объектах
    if (Object.hasOwn(obj2, key)) {
      // Если значения одинаковые
      if (obj1[key] === obj2[key]) commonArray.push(`${key}: ${obj1[key]} `);
      else {
        commonArray.push(`${key}: ${obj1[key]}-`);
        commonArray.push(`${key}: ${obj2[key]}+`);
      }
    }
  }
  // Если ключ только во 2 объекте
  for (const key in obj2) {
    if (!Object.hasOwn(obj1, key)) commonArray.push(`${key}: ${obj2[key]}+`);
  }
  const sortedArray = commonArray.sort();
  const result = [];
  for (let i = 0; i < sortedArray.length; i += 1) {
    const lastSymbol = sortedArray[i].slice(sortedArray[i].length - 1, sortedArray[i].length);
    result.push(`${lastSymbol} ${sortedArray[i].slice(0, -1)}`);
  }

  const string = result.join('\n  ');

  return `{ \n  ${string}\n}`;
};

const returnDiff = (file1, file2) => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  return getDiff(obj1, obj2);
};

export default returnDiff;
