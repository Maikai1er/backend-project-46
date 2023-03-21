import fs from 'fs';
import _ from 'lodash';

const object = JSON.parse(fs.readFileSync('../__fixtures__/diff.json'));

const plain = (obj) => {
  const resultConstructor = [];
  let keyConstructor = [];
  let treeDepth = 0;
  const constructString = (key, type, oldValue, newValue = null) => {
    if (type === 'added') return `Property ${keyConstructor.join('.')} was added with value: ${oldValue}`;
    if (type === 'removed') return `Property ${keyConstructor.join('.')} was removed`;
    if (type === 'changed') return `Property ${keyConstructor.join('.')} was updated. From ${oldValue} to ${newValue}`;
  };
  const constructLeafs = (children) => {
    for (let i = 0; i < children.length; i += 1) {
      const { key, type } = children[i];
      keyConstructor = keyConstructor.slice(treeDepth, keyConstructor.length - 1);
      keyConstructor.push(key);
      if (type !== 'unchanged') {
        if (type === 'changed') {
          let { oldValue, newValue } = children[i];
          if (_.isObject(oldValue)) oldValue = '[complex value]';
          if (_.isObject(newValue)) newValue = '[complex value]';
          resultConstructor.push(constructString(key, type, oldValue, newValue));
          keyConstructor.pop();
          treeDepth -= 1;
        } else {
          let { value } = children[i];
          if (_.isObject(value)) value = '[complex value]';
          resultConstructor.push(constructString(key, type, value));
          treeDepth -= 1;
          keyConstructor.pop();
        }
      } else if (children[i].hasOwnProperty('children')) {
        treeDepth += 1;
        constructLeafs(children[i].children);
      }
    }
  };
  constructLeafs(obj.children);
  return resultConstructor.join('\n');
};

console.log(plain(object));
