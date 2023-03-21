import returnDiff from "../src/index.js";

test('getDiff', () => {
  const expectedResult = '{ \n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(returnDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedResult);
});
