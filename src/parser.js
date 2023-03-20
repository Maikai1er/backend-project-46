import fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';

const parser = (file) => {
  const filepath = path.resolve(process.cwd(), '__fixtures__', file);
  if (filepath.endsWith('json')) return JSON.parse(fs.readFileSync(filepath));
  if (filepath.endsWith('yml' || 'yaml')) return yaml.load(fs.readFileSync(filepath));
  return 'file extension not supported';
};

export default parser;
