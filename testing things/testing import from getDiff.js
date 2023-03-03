import getDiff from '../src/getDiff.js';

const filepath1 = '../__fixtures__/file1.json';
const filepath2 = '../__fixtures__/file2.json';
const result = getDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json');

console.log(result);
