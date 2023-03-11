const obj = {
  russia: 146780,
  ukraine: 42153,
  belarus: 9475,
};

const returnKeys = (obj) => {
  return Object.entries(obj).map((element) => element[0]);
};

console.log(returnKeys(obj));
