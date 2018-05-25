`use strict`;

const conf = require(`../conf`);
const gulp = require(`gulp`);
const path = require(`path`);
const minify = require('gulp-minify');
const mainBowerFiles = require(`main-bower-files`);
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
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task(`fonts`, () => {
  // only applied on fonts from bower dependencies
  // custom fonts are handled by the "other" task
  return gulp.src(mainBowerFiles())
    .pipe(plugins.filter(`**/*.{eot,svg,ttf,woff,woff2}`))
    .pipe(plugins.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, `/fonts/`)));
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

gulp.task('build', ['script', 'minify', 'styles:build', 'html', 'fonts', 'other', 'bower']);
