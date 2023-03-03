import fs from "fs";

const filepath1 = '../__fixtures__/file1.json';
const filepath2 = '../__fixtures__/file2.json';
const obj1 = JSON.parse(fs.readFileSync(filepath1));
const obj2 = JSON.stringify(obj1);
const objj1 = JSON.parse(fs.readFileSync(filepath2));
const objj2 = JSON.stringify(objj1);
const result = [];
let key1
let value1
let key2
let value2
let compareResult = 0;
JSON.parse(obj2, (key, value) => {
  key1 = key;
  value1 = value
  JSON.parse(objj2, (key, value) => {
    key2 = key;
    value2 = value;
  })
  if (key1 === key2) {
    if (value1 === value2) {
      result.push({ key1: value1 });
    }
    else {
      result.push({ key1: value1 });
      result.push({ key2: value2 });
    }
  } else resul
  else result.push('different');
  return value;
})
console.log(result);


//const genDiff = (filepath1, filepath2) => {
//  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
//  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
//  console.log(obj1);
//}
