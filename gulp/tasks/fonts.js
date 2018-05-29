`use strict`;

const conf = require(`../conf`);
const gulp = require('gulp');
const browserSync = require(`browser-sync`).create();
const path = require(`path`);

const plugins = require(`gulp-load-plugins`)({
    pattern: [
        `gulp-flatten`
    ]
});

gulp.task(`fonts:build`, () => {
    return gulp.src(path.join(conf.paths.src, `/**/*.{eot,svg,ttf,woff,woff2}`))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, `fonts/`)));
});

gulp.task(`fonts`, () => {
    return gulp.src(path.join(conf.paths.src, `/**/*.{eot,svg,ttf,woff,woff2}`))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(path.join(conf.paths.tmp, `serve/fonts/`)));
});