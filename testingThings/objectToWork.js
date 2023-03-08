const obj1 = { name: 'Mikhail', surname: 'Kolesnichenko', property: null };
const obj2 = { name: 'Mikhail', surname: 'Zvonarev' };
const result = [];

for (const key in obj1) {
  // Если ключ только в 1 объекте
  if (!Object.hasOwn(obj2, key)) result.push(`${key}: ${obj1[key]}-`);
  // Если ключ в обоих объектах
  if (Object.hasOwn(obj2, key)) {
    // Если значения одинаковые
    if (obj1[key] === obj2[key]) result.push(`${key}: ${obj1[key]} `);
    else {
      result.push(`${key}: ${obj1[key]}-`);
      result.push(`${key}: ${obj2[key]}+`);
    }
  }
}

for (const key in obj2) {
  if (!Object.hasOwn(obj1, key)) result.push(`${key}: ${obj2[key]}+`);
}
const finalResult = result.sort();
console.log(finalResult);
const superFinalResult = [];
for (let i = 0; i < finalResult.length; i += 1) {
  const lastSymbol = finalResult[i].slice(finalResult[i].length - 1, finalResult[i].length);
  console.log(lastSymbol)
  superFinalResult.push(`${lastSymbol} ${finalResult[i].slice(0, -1)}`);
}
console.log(superFinalResult);
