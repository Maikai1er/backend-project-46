import fs from "fs";

const filepath1 = '../filesToCompare/file1.json';
const filepath2 = '../filesToCompare/file2.json';

const obj1 = JSON.parse(fs.readFileSync(filepath1));
const obj2 = JSON.parse(fs.readFileSync(filepath2));

console.log(obj1)
console.log(obj2)

const result = [];

for (const keys in obj1) {
  if (!Object.hasOwn(obj2, keys)) result.push(`  -${keys}: ${obj1[keys]}`)
  if (Object.hasOwn(obj2, keys) && )
}
console.log(result)
