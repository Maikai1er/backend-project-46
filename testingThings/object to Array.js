const populations = {
  russia: 146780,
  ukraine: 42153,
  belarus: 9475
}

const countries = [];

for (let population in populations) {
  if (populations.hasOwnProperty(population)) {
    countries.push(population)
  }
}
console.log(countries);
