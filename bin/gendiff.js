#!/usr/bin/env node

import { Command } from 'commander';
import returnDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(returnDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
