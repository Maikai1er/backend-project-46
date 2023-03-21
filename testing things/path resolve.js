import * as path from 'path';

const constructPath = (filepath) => {
  const path1 = path.resolve(filepath);
  return path1;
};

console.log(constructPath('../__fixtures__/file1.json'));
