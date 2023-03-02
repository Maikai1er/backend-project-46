import getDiff from "../src/getDiff.js";

const filepath1 = '../filesToCompare/file1.json';
const filepath2 = '../filesToCompare/file2.json';
const result = getDiff('../filesToCompare/file1.json', '../filesToCompare/file2.json');

console.log(result);
