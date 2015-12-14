'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      //type: 'confirm',
      name: 'sdkName',
      message: 'What would you like to name your SDK component?',
      default: 'template'
    },
    {
      //type: 'confirm',
      name: 'bundleID',
      message: 'Please choose a bundle identifier',
      default: 'com.sap.sample'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var done = this.async();
      var bundleID = this.props.bundleID;
      var sdkName = this.props.sdkName;
      var sdkNameOneWord = sdkName.replace(/\s+/g, '');
      var sdkNameLower = sdkNameOneWord.toLowerCase();

      this.fs.copyTpl(
        this.templatePath('root'),
        this.destinationPath(),
        {
            bundle: bundleID,
            title: sdkName,
            titleLower: sdkNameLower,
            titleOneWord: sdkNameOneWord
        }
      );

      //Needed otherwise .project file not copied
      this.fs.copyTpl(
        this.templatePath('root/src/component/.project'),
        this.destinationPath('src/component/.project'),
        {
            bundle: bundleID,
            titleLower: sdkNameLower
        }
      );

      done();
    }

  },

  install : function(){
    var currentDir = process.cwd();
    var bowerDir = currentDir + '/test/live_preview';

    this.currentDir = currentDir;

    this.log('Installing Dependancies...');

    this.npmInstall();

    process.chdir(bowerDir);
    this.bowerInstall();
  },

  end: function() {
    process.chdir(this.currentDir);
  }



});
