import parser from './parser.js';
import returnFormatted from './formatters/index.js';
import getDiff from './getDiff.js';

const returnDiff = (file1, file2, formatter = 'stylish') => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const result = getDiff(obj1, obj2);
  return returnFormatted(result, formatter);
};
export default returnDiff;
