/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src: `src`,
    dist: `dist`,
    tmp: `.tmp`,
    test: `test`
};


/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
    //exclude: [/\/bootstrap\.css/],
    // exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
    directory: `bower_components`
  };


exports.backend = {
    local : `http://localhost:8084`
};