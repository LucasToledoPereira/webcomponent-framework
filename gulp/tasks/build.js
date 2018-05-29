`use strict`;

const conf = require(`../conf`);
const gulp = require(`gulp`);
const path = require(`path`);
const minify = require('gulp-minify');
const dest = require('gulp-dest');
const plugins = require(`gulp-load-plugins`)({
    pattern: [
        'gulp-minify-html', `gulp-flatten`, `gulp-filter`
    ]
});


gulp.task('minify', function() {
  gulp.src(path.join(conf.paths.tmp, 'serve/scripts/*.js'))
      .pipe(minify({
          ext: {
              src: '.js',
              min: '.min.js'
          }
      }))
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', function() {
  return gulp.src(path.join(conf.paths.src, '/**/*.html'))
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(gulp.dest(path.join(conf.paths.dist, `html/`)));
});

gulp.task(`other`, () => {
  const fileFilter = plugins.filter(file => {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, `/**/*`),
    path.join(`!${conf.paths.src}`, `/**/*.{html,css,js,scss, sass}`)
  ]).pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, `/`)));
});

gulp.task('build', ['script:build', 'styles:separated:build', 'html', 'fonts:build']);
