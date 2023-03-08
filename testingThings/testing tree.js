import _ from 'lodash';

const obj = { name: 'Mikhail', subValues: { subValue1: 3 } };
const resultPush = (object) => {
  const result = object.reduce((acc, key) => {
    acc.push(`${key}: ${object[key]}`);
    if (_.isObject(object)) resultPush(object[key]);
    return acc;
  }, []);
  return result;
};
console.log(resultPush(obj));
