const arr = ['123', 'true', ['546']];
const result = [];
for (let i = 0; i < arr.length; i += 1) {
  if (Array.isArray(arr[i + 1])) result.push('array');
  else result.push('element');
}
console.log(result);
