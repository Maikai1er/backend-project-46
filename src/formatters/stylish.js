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

  const processChild = (child) => {
    if (child.type === 'changed') {
      const { key, oldValue, newValue } = child;
      return [
        [constructChangedKey(key, 'old'), oldValue],
        [constructChangedKey(key, 'new'), newValue],
      ];
    } else {
      const { key, type, value, children } = child;
      const newKey = constructKey(key, type);
      const result = { [newKey]: value };
      if (children) {
        result[newKey] = constructor(child);
      }
      return result;
    }
  };

  return obj.children.map(processChild).reduce((acc, curr) => ({ ...acc, ...curr }), {});
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

//comment to see issues;
