#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/getDiff.js';

const program = new Command();

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => console.log(getDiff(filepath1, filepath2)));

program.parse();

// const filepath1 = '../__fixtures__/file1.json';
// const filepath2 = '../__fixtures__/file2.json';
