const obj = { key: 'true', value: 'false' };
const newObj = {}
const newKey = obj.key;
newObj[newKey] = obj.value;
console.log(newObj);
