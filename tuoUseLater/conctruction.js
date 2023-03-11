const constructObject = (key, type, value) => {
  if (type === 'removed') return ({ key, value, type });
  if (type === 'added') return ({ key, value, type });
  if (type === 'changed') return ({ key, value, type });
  return ({ key, value, type });
};
const constructChildren = (key, type, child) => {
  if (type === 'removed' || 'added') return ({ key, type, child });
  if (type === 'changed') return ({ key, type, child });
  return ({ key, type, child });
};
