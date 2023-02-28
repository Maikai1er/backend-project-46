#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')

program.parse();

const filepath1 = '../filesToCompare/file1.json';

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

}
