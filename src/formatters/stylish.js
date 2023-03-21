const constructor = (obj) => {
  const constructKey = (key, type) => {
    if (type === 'added') return `+ ${key}`;
    if (type === 'removed') return `- ${key}`;
    return `  ${key}`;
  };
  const constructChangedKey = (changedKey, valueType) => {
    if (valueType === 'old') return `- ${changedKey}`;
    return `+ ${changedKey}`;
  };
  const result = {};
  for (let i = 0; i < obj.children.length; i += 1) {
    const { key, type } = obj.children[i];
    let newKey;
    if (type === 'changed') {
      const { oldValue, newValue } = obj.children[i];
      let valueType = 'old';
      const newKey1 = constructChangedKey(key, valueType);
      result[newKey1] = oldValue;
      valueType = 'new';
      const newKey2 = constructChangedKey(key, valueType);
      result[newKey2] = newValue;
    } else {
      const { value } = obj.children[i];
      newKey = constructKey(key, type);
      result[newKey] = value;
    }
    if (obj.children[i].hasOwnProperty('children')) {
      result[newKey] = constructor(obj.children[i]);
    }
  }
  return result;
};

const stylish = (object) => {
  const string = JSON.stringify(constructor(object), null, 1).replaceAll('"', '').replaceAll(',', '');
  let result = '{';
  let spaceCounter = 2;
  const spaceIncreaser = 4;
  const toTrim = string.split('\n');
  const coll = toTrim.map((element) => {
    const temp = element.trimStart();
    const res = ['{', '+', '-'].some((word) => temp.startsWith(word));
    if (res) return temp;
    return `  ${temp}`;
  });
  for (let i = 1; i < coll.length - 1; i += 1) {
    result += `\n${' '.repeat(spaceCounter)}${coll[i]}`;
    if (coll[i].endsWith('{')) spaceCounter += spaceIncreaser;
    if (coll[i + 1].endsWith('}')) spaceCounter -= spaceIncreaser;
  }
  return `${result}\n}`;
};

export default stylish;
