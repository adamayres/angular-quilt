'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var openPath;
var openBrowser;
var port = 3000; //default: 3000

/*
 * Allow for a custom URL path to be set
 * when starting the app in development mode.
 * This will be appended to the URL that is opened.
 *
 * Example: gulp --open=admin
 */
openPath = gutil.env.open || '';

/*
 * Allow for a different browser to be used
 * when opening the app in development mode.
 * By default use the user's default browser;
 *
 * Example: gulp --browser=Firefox
 */
openBrowser = gutil.env.browser;

/*
 * Default task is to start the app
 */
gulp.task('default', ['app']);

gulp.task('app', function () {
  var express = require('express');
  var app = express();

  app.use(require('connect-livereload')({
    port: 35729
  }));

  app.use(express.static('./'));
  app.use(express.static('./examples'));

  app.listen(port, function () {
    var lrServer = require('gulp-livereload')();

    gulp.watch(['directives/**/*.*', 'examples/**/*.*']).on('change', function (file) {
      console.log('Reload', file.path);
      lrServer.changed(file.path);
    });

    require('open')('http://localhost:' + port +'/' + openPath, openBrowser);
  });
});