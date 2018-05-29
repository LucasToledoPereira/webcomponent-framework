`use strict`;

const gulp = require('gulp');
const browserSync = require(`browser-sync`).create();
const path = require(`path`);
const conf = require(`../conf`);
const wiredep = require(`wiredep`).stream;

const plugins = require(`gulp-load-plugins`)({
    pattern: [`gulp-autoprefixer`, `gulp-concat`, `gulp-if`, `gulp-inject`, `gulp-rename`, `gulp-sass`, `gulp-sourcemaps`]
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: conf.paths.tmp
        },
    })
})


gulp.task('watch',function(){
  gulp.watch(path.join(conf.paths.src, `/{,**/}*.{scss,sass}`), ['styles:separated']);
  //gulp.watch(path.join(conf.paths.src, `/{,**/}*.{html}`));
  gulp.watch(path.join(conf.paths.src, `/{,**/}*.{js}`), ['script']);
     //Other watchers
});


gulp.task(`serve`, ['watch', 'styles:separated', 'script', 'fonts'], done => {
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