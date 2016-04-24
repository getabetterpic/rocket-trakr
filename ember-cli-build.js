/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['bower_components/Materialize/sass']
    }
  });

  const robotoOptions = { destDir: 'font/roboto' };
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.eot', robotoOptions);
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.ttf', robotoOptions);
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.woff', robotoOptions);
  app.import('bower_components/Materialize/font/roboto/Roboto-Regular.woff2', robotoOptions);

  const firaOptions = { destDir: 'font/fira-mono'};
  app.import('vendor/fonts/firamono-regular-webfont.eot', firaOptions);
  app.import('vendor/fonts/firamono-regular-webfont.ttf', firaOptions);
  app.import('vendor/fonts/firamono-regular-webfont.svg', firaOptions);
  app.import('vendor/fonts/firamono-regular-webfont.woff', firaOptions);
  app.import('vendor/fonts/firamono-regular-webfont.woff2', firaOptions);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
