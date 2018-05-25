`use strict`;

const browserSync = require(`browser-sync`);
const conf = require(`../conf`);
const gulp = require(`gulp`);
const path = require(`path`);
const wiredep = require(`wiredep`).stream;
const csso = require('gulp-csso');
const plugins = require(`gulp-load-plugins`)({
    pattern: [`gulp-autoprefixer`, `gulp-concat`, `gulp-if`, `gulp-inject`, `gulp-rename`, `gulp-sass`, `gulp-sourcemaps`]
});

gulp.task(`styles`, () => {
    const injectFiles = gulp.src([
        path.join(conf.paths.src, `/{,**/}*.{scss,sass, css}`),
        path.join(`!` + conf.paths.src, `/index.scss`)
    ], {
        read: false
    });

  const injectOptions = {
    transform: filePath => {
      return `@import "${filePath}";`;//Verificar transformacao de estilos para todos os components
    },
    starttag: `// injector`,
    endtag: `// endinjector`,
    addRootSlash: false
  };

  const sassOptions = {
    style: `expanded`
  };

  return gulp.src([path.join(conf.paths.src, `/index.scss`)])
    .pipe(plugins.inject(injectFiles, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(plugins.sourcemaps.init({largeFile: true}))
    .pipe(plugins.sass(sassOptions))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, `/serve/styles/`)))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task(`styles:build`, () => {
  const injectFiles = gulp.src([
      path.join(conf.paths.src, `/{,**/}*.{scss,sass, css}`),
      path.join(`!` + conf.paths.src, `/index.scss`)
  ], {
      read: false
  });

const injectOptions = {
  transform: filePath => {
    return `@import "${filePath}";`;//Verificar transformacao de estilos para todos os components
  },
  starttag: `// injector`,
  endtag: `// endinjector`,
  addRootSlash: false
};

const sassOptions = {
  style: `expanded`
};

return gulp.src([path.join(conf.paths.src, `/index.scss`)])
  .pipe(plugins.inject(injectFiles, injectOptions))
  .pipe(wiredep(Object.assign({}, conf.wiredep)))
  .pipe(plugins.sourcemaps.init({largeFile: true}))
  .pipe(plugins.sass(sassOptions))
  .pipe(plugins.autoprefixer())
  .pipe(plugins.sourcemaps.write())
  .pipe(csso())
  .pipe(gulp.dest(path.join(conf.paths.dist, `styles/`)))
  .pipe(browserSync.reload({ stream: true }));
});