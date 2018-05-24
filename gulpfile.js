'use strict';

const gulp = require('gulp');
const fs = require('fs');

/**
 *  This will load all js or coffee files in the gulp/tasks directory *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp/tasks')
  .filter(file => (/\.(js|coffee)$/i).test(file))
  .map(file => require('./gulp/tasks/' + file));
