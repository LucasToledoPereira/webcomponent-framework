`use strict`;

const gulp = require('gulp');
const browserSync = require(`browser-sync`);
const path = require(`path`);
const conf = require(`../conf`);

gulp.task(`serve`, done => {
    browserSyncInit([path.join(conf.paths.tmp, `/serve`), conf.paths.src], conf.backend.local, true, null, done);
});

function browserSyncInit(baseDir, backendUrl, open, browser, done) {
    browser = browser ? `default` : browser;
  
    let server = {
      baseDir: baseDir
    };
  
    if (baseDir === conf.paths.src || (Array.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
      server.routes = {
        '/bower_components': `bower_components`
      };
    }
    
    browserSync.instance = browserSync.init({
      server: server,
      browser: browser,
      open: open
    }, (err, data) => {
      browserSync.instance.urls = data.options.get(`urls`);
      done && done(err, data)
    });
  }