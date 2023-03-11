import _ from 'lodash';

const obj = { name: 'Mikhail', surname: 'Zvonarev', testKey: { someKey: 'someValue' } };
const returnKeys = (object) => {
  let nestedKey = '';
  const result = [];
  for (const keys in object) {
    if (_.isObject(object[keys])) {
      nestedKey = object[keys];
      returnKeys(object[keys]);
    }
    result.push(keys);
  }
  const finalResult = result.join(' ');
  return `${nestedKey} ${finalResult}`;
};
console.log(returnKeys(obj));
