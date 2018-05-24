`use strict`;

const conf = require(`../conf`);
const gulp = require(`gulp`);
const path = require(`path`);
const plugins = require(`gulp-load-plugins`)({
    pattern: [
        'gulp-minify-html'
      //`gulp-angular-templatecache`, `gulp-filter`, `gulp-flatten`, `gulp-ignore`, `gulp-inject`, `gulp-minify-html`,
      //`gulp-replace`, `gulp-sequence`, `gulp-size`, `gulp-sourcemaps`, `gulp-template`, `gulp-useref`, `gulp-zip`
    ]
});

gulp.task(`partials`, () => {
    return gulp.src([
      path.join(conf.paths.src, `/**/*.html`),
      path.join(conf.paths.tmp, `/serve/**/*.html`)
    ])
    .pipe(plugins.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(gulp.dest(`${conf.paths.tmp}/partials/`));
});


gulp.task(`html`, [`partials`], () => {
    const partialsInjectFile = gulp.src(path.join(conf.paths.tmp, `/partials/templateCacheHtml.js`), {read: false});
    const partialsInjectOptions = {
      starttag: `<!-- inject:partials -->`,
      ignorePath: path.join(conf.paths.tmp, `/partials`),
      addRootSlash: false
    };
  
    let htmlFilter = plugins.filter(`**/*.html`, {restore: true});
    let jsFilter = plugins.filter(`**/*.js`, {restore: true});
    let cssFilter = plugins.filter(`**/*.css`, {restore: true});
    let assets;
  
    return gulp.src(path.join(conf.paths.tmp, `/serve/**/index.html`), {baseDir: `.tmp/serve/`})
      .pipe(plugins.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = plugins.useref.assets())
      .pipe(jsFilter)
      .pipe(plugins.sourcemaps.init({largeFile: true}))
      .pipe(plugins.sourcemaps.write(`maps`))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe(plugins.sourcemaps.init({largeFile: true}))
      .pipe(plugins.replace(`../../bower_components/bootstrap-sass/assets/fonts/bootstrap/`, `../fonts/`))
      .pipe(plugins.sourcemaps.write(`maps`))
      .pipe(cssFilter.restore)
      .pipe(assets.restore())
      .pipe(plugins.useref())
      .pipe(htmlFilter)
      .pipe(plugins.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(path.join(conf.paths.dist, `/`)))
      .pipe(plugins.size({ title: path.join(conf.paths.dist, `/`), showFiles: true }));
});