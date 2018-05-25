`use strict`;

const conf = require(`../conf`);
const fs = require(`fs`);
const gulp = require(`gulp`);

gulp.task(`bower`, createBowerFile);

function createBowerFile() {
  fs.readFile(`bower.json`, `utf8`, writeFile);

  function writeFile(err, data) {
    fs.writeFile(conf.paths.dist + `/bower.json`, data);
  }
}