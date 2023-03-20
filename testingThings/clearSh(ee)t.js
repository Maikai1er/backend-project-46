import _ from 'lodash';

const obj = {
  key: null,
  type: 'root',
  children: [
    {
      key: 'common',
      type: 'unchanged',
      value: 'false',
    },
    {
      key: 'uncommon',
      type: 'added',
      value: {
        key: 'true',
        type: 'changed',
        value: 'something',
      },
    }],
};

const createObject = (key, type, value) => {
  if (type === 'unchanged') {
    const newKey = `    ${key}`;
    return [newKey, value];
  }
  if (type === 'added') {
    const newKey = `  + ${key}`;
    return [newKey, value];
  };
};

for (let i = 0; i < obj.children.length; i += 1) {
  const { key, type, value } = obj.children[i];
  const result2 = createObject(key, type, value);
  console.log(result2.join(': '));
}
