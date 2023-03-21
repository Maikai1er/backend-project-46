import stylish from './stylish.js';
import plain from './plain.js';

const returnFormatted = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error('Unsupported format type');
  }
};

export default returnFormatted;
