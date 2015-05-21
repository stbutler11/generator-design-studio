'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('yeoman-generator/node_modules/mkdirp');

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

      var gruntString = this.fs.read(this.templatePath('Gruntfile.js'));
       gruntString = gruntString.replace("$BUNDLE$",bundleID);
       gruntString = gruntString.replace("$SDKLOWER$",sdkNameLower);
       gruntString = gruntString.replace("$SDKONE$" ,sdkNameOneWord);
       gruntString = gruntString.replace("$SDKNAME$",sdkName);

      console.log(gruntString);
     // this.fs.createPreloadedFile(this.destinationPath(),'Gruntfile.js',null,true,true);

     this.fs.write(this.destinationPath('Gruntfile.js'),gruntString);

    //mkdirp used to create empty directories
      mkdirp.sync(this.destinationPath('dist/'));
      done();
    }

  },

  install : function(){

    console.log('Installing Dependancies...');

    this.npmInstall();
    var bowerDir = process.cwd() + '/test/live_preview';
    process.chdir(bowerDir);
    this.bowerInstall();
  }



});
