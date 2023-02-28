import _ from 'lodash';

const obj1 = { name: 'Mikhail', surname: 'Kolesnichenko', age: 25 };
const obj2 = { name: 'Mikhail', surname: 'Petrov' };
console.log(Object.hasOwn(obj1, 'name'));

// коды: 0 - совпадает ключ и значение, 1 - совпадает ключ, не совпадает значение, 2 - не совпадает ни ключ, ни значение

const result = [];
for (const keys in obj1) {
  if (!Object.hasOwn(obj2, keys)) result.push(2);
  else {
    if (obj1[keys] === obj2[keys]) result.push(0);
    else result.push(1);
  }
}

console.log(result);

const result2 = [];

for (const keys in obj1) {
  console.log(obj1[keys])
}
