/*global before */

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('sdk:app', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        'sdkName': 'My First Sdk App',
        'bundleID': 'com.test.test'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Gruntfile.js',
      'package.json',
      'src/component/META-INF/MANIFEST.MF',
      'src/component/contribution.xml',
    ]);
  });
});
