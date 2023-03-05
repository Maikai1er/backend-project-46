import _ from 'lodash';

const obj = { name: 'Mikhail', subValues: { subValue1: 3 } };
console.log(_.isObject(obj.name));
console.log(_.isObject(obj));
console.log(_.isObject(obj.subValues));
