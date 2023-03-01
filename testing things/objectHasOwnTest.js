import _ from 'lodash';

const obj1 = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false
}
const obj2 = {
  timeout: 20,
  verbose: true,
  host: "hexlet.io"
}

// коды: 0 - совпадает ключ и значение, 1 - совпадает ключ, не совпадает значение, 2 - не совпадает ни ключ, ни значение

const result = [];
for (const keys in obj2) {
  if (!Object.hasOwn(obj1, keys)) result.push(`${keys}: ${obj2[keys]}`);
  else {
    if (obj2[keys] === obj1[keys]) result.push(`${keys}: ${obj2[keys]}`);
    else result.push(`${keys}: ${obj2[keys]}`);
  }
}

console.log(result);
