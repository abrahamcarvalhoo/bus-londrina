var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browsersync = require('browser-sync').create();
var sequence = require('run-sequence');
var del = require('del');

var options = {
  production: false
};

var path = {
  dist: {
    default: 'dist',
    components: 'dist/components',
    scripts: 'dist/assets/javascripts',
    styles: 'dist/assets/stylesheets',
    images: 'dist/assets/images',
    fonts: 'dist/assets/fonts'
  },
  app: {
    views: 'app/views/*.{pug,html}',
    components: 'app/views/components/*.{pug,html}',
    scripts: 'app/assets/javascripts/*.js',
    styles: 'app/assets/stylesheets/*.{scss,sass}',
    images: 'app/assets/images/**/*.{jpg,png,gif,svg}',
    fonts: 'app/assets/fonts/**/*.{eot,otf,svg,ttf,woff,woff2}',
    static: 'app/static/**/*.*'
  },
  watch: {
    views: 'app/views/**/*.{pug,html}',
    scripts: 'app/assets/javascripts/**/*.js',
    styles: 'app/assets/stylesheets/**/*.{scss,sass}',
    images: 'app/assets/images/**/*.{jpg,png,gif,svg}',
    fonts: 'app/assets/fonts/**/*.{eot,otf,svg,ttf,woff,woff2}',
    static: 'app/static/**/*.*'
  },
  base: {
    views: 'app/views',
    components: 'app/views/components',
    scripts: 'app/assets/javascripts',
    styles: 'app/assets/stylesheets',
    images: 'app/assets/images',
    fonts: 'app/assets/fonts',
    static: 'app/static',
    vendors: 'node_modules',
    config: './config.json'
  }
};

var onError = function(error) {
  $.notify.onError({
    title: 'Gulp Error!',
    message: 'Error: (<%= error.plugin %>) <%= error.message %>'
  })(error);
  this.emit('end');
};

gulp.task('views', function() {
  return gulp.src(path.app.views)
  .pipe($.plumber({errorHandler: onError}))
  .pipe($.data(function(file) {
    return require(path.base.config);
  }))
  .pipe($.data(function() {
    return JSON.parse('{"production": "'+options.production+'"}');
  }))
  .pipe($.pug({basedir: path.base.views, pretty: true}))
  .pipe(gulp.dest(path.dist.default))
  .pipe(browsersync.stream());
});

gulp.task('components', function() {
  return gulp.src(path.app.components)
  .pipe($.plumber({errorHandler: onError}))
  .pipe($.data(function(file) {
    return require(path.base.config);
  }))
  .pipe($.data(function() {
    return JSON.parse('{"production": "'+options.production+'"}');
  }))
  .pipe($.pug({basedir: path.base.components, pretty: true}))
  .pipe(gulp.dest(path.dist.components))
  .pipe(browsersync.stream());
});

gulp.task('styles', function() {
  return gulp.src(path.app.styles)
  .pipe($.plumber({errorHandler: onError}))
  .pipe($.if(!options.production, $.sourcemaps.init()))
  .pipe($.sass.sync({
    precision: 10,
    outputStyle: 'compressed',
    includePaths: [path.base.vendors, path.base.styles]
  }).on('error', onError))
  .pipe($.autoprefixer({browsers: ['last 2 versions']}))
  .pipe($.if(!options.production, $.sourcemaps.write()))
  .pipe($.if(options.production, $.cleanCss()))
  .pipe(gulp.dest(path.dist.styles))
  .pipe(browsersync.stream());
});

gulp.task('scripts', function() {
  return gulp.src([path.base.scripts + '/requirements.js', path.base.scripts + '/application.js'])
  .pipe($.plumber({errorHandler: onError}))
  .pipe($.include({includePaths: [path.base.vendors, path.base.scripts]}))
  .pipe($.if(options.production, $.concat('application.js')))
  .pipe(gulp.dest(path.dist.scripts))
  .pipe(browsersync.stream());
});

gulp.task('images', function() {
  return gulp.src(path.app.images)
  .pipe($.changed(path.dist.images))
  .pipe(gulp.dest(path.dist.images))
  .pipe(browsersync.stream());
});

gulp.task('fonts', function() {
  return gulp.src(path.app.fonts)
  .pipe($.changed(path.dist.fonts))
  .pipe(gulp.dest(path.dist.fonts))
  .pipe(browsersync.stream());
});

gulp.task('static', function() {
  return gulp.src(path.app.static)
  .pipe(gulp.dest(path.dist.default))
  .pipe(browsersync.stream());
});

gulp.task('clean', function() {
  return del(path.dist.default);
});

gulp.task('watch', function() {
  browsersync.init({
    ui: false,
    port: 3000,
    notify: false,
    server: path.dist.default
  });

  gulp.watch(path.watch.views, ['components', 'views']);
  gulp.watch(path.watch.styles, ['styles']);
  gulp.watch(path.watch.scripts, ['scripts']);
  gulp.watch(path.watch.images, ['images']);
  gulp.watch(path.watch.fonts, ['fonts']);
  gulp.watch(path.watch.static, ['static']);
});

gulp.task('build', function(callback) {
  return sequence(['clean'], ['components'], ['views'], ['styles'], ['scripts'], ['images'], ['fonts'], ['static'], callback);
});

gulp.task('deploy', function(callback) {
  options.production = true;
  return sequence(['build'], callback);
});

gulp.task('default', function(callback) {
  return sequence(['build'], ['watch'], callback);
});
