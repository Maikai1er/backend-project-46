import fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';

const parser = (file) => {
  const filepath = path.resolve(process.cwd(), '__fixtures__', file);
  const fileExtension = filepath.split('.').at(-1);
  if (fileExtension === 'json') return JSON.parse(fs.readFileSync(filepath));
  if (fileExtension === 'yml' || fileExtension === 'yaml') return yaml.load(fs.readFileSync(filepath));
  return null;
};

export default parser;
