import _ from 'lodash';

const plain = (obj) => {
  const resultConstructor = [];
  const keyConstructor = [];
  const constructString = (key, type, value1, value2) => {
    if (type === 'added') return `Property '${keyConstructor.join('.')}' was added with value: ${value1}`;
    if (type === 'removed') return `Property '${keyConstructor.join('.')}' was removed`;
    return `Property '${keyConstructor.join('.')}' was updated. From ${value1} to ${value2}`;
  };
  const checkType = (temp) => {
    if (typeof temp === 'string') return `'${temp}'`;
    if (_.isObject(temp)) return '[complex value]';
    return temp;
  };
  const constructLeafs = (children) => {
    for (let i = 0; i < children.length; i += 1) {
      const { key, type } = children[i];
      keyConstructor.push(key);
      if (type !== 'unchanged') {
        if (type === 'changed') {
          let { oldValue, newValue } = children[i];
          oldValue = checkType(oldValue);
          newValue = checkType(newValue);
          resultConstructor.push(constructString(key, type, oldValue, newValue));
          keyConstructor.pop();
        } else {
          let { value } = children[i];
          value = checkType(value);
          resultConstructor.push(constructString(key, type, value));
          keyConstructor.pop();
        }
      } else if (children[i].hasOwnProperty('children')) {
        constructLeafs(children[i].children);
      } if (type === 'unchanged' && !children[i].hasOwnProperty('children')) keyConstructor.pop();
      if (i === children.length - 1) keyConstructor.pop();
    }
  };
  constructLeafs(obj.children);
  return resultConstructor.join('\n');
};

export default plain;
