import _ from 'lodash';

const plain = (obj) => {
  const constructString = (key, type, value1, value2) => {
    if (type === 'added') return `Property '${key}' was added with value: ${value1}`;
    if (type === 'removed') return `Property '${key}' was removed`;
    return `Property '${key}' was updated. From ${value1} to ${value2}`;
  };

  const checkType = (temp) => {
    if (typeof temp === 'string') return `'${temp}'`;
    if (_.isObject(temp)) return '[complex value]';
    return temp;
  };

  const constructLeafs = (children, keyConstructor = []) => (
    children.flatMap((child) => {
      const { key, type } = child;
      const newKeyConstructor = [...keyConstructor, key];

      if (type !== 'unchanged') {
        if (type === 'changed') {
          const { oldValue, newValue } = child;
          const oldValueStr = checkType(oldValue);
          const newValueStr = checkType(newValue);
          return [constructString(newKeyConstructor.join('.'), type, oldValueStr, newValueStr)];
        } else {
          const { value } = child;
          const valueStr = checkType(value);
          return [constructString(newKeyConstructor.join('.'), type, valueStr)];
        }
      } else if (child.hasOwnProperty('children')) {
        return constructLeafs(child.children, newKeyConstructor);
      } else {
        return [];
      }
    })
  );

  const result = constructLeafs(obj.children);
  return result.join('\n');
};

export default plain;
