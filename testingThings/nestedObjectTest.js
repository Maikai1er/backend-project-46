import _ from 'lodash';

const obj1 = { name: 'Mikhail', surname: 'Kolesnichenko', property: { someKey: 'someValue' } };

const returnKeys = (object) => {
  const keys = Object.keys(object);
  const result = keys.reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc += `${key} : ${returnKeys(object[key])}\n`;
      return acc;
    }
    if (_.has(object, key)) acc += `${key}: ${object[key]}\n`;
    return acc;
  }, '');
  return result;
};

console.log(returnKeys(obj1));
