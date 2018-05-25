const gulp = require('gulp');
const webpack = require(`webpack-stream`);
const path = require(`path`);
const conf = require(`../conf`);
const browserSync = require(`browser-sync`).create();

gulp.task('script', function() {
    return gulp.src(path.join(conf.paths.src, 'index.js'))
        .pipe(webpack({
            module: {
                loaders: [{
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            output: {
                filename: 'framework.js'
            }
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'serve/scripts')))
        .pipe(browserSync.reload({ stream: true }));
});
