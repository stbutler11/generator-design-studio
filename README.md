[![Code Climate](https://codeclimate.com/github/stbutler11/generator-design-studio/badges/gpa.svg)](https://codeclimate.com/github/stbutler11/generator-design-studio)

This is a Yeoman generator for Design Studio SDK components.

## Setup 

1. Install node
2. Install [Yeoman](http://yeoman.io/) globally
   * ```npm install -g yo```
3. Install [bower](http://bower.io/) globally
  * ```npm install -g bower```
4. Install [grunt](http://gruntjs.com/) globally
  * ```npm install -g grunt-cli```
2. Install generator-design-studio globally
   *  ```npm install -g generator-design-studio```
3. Create a folder in which you wish to place the SDK Design Studio
Generator
4. Run ```yo design-studio``` in the folder where the SDK Generator has
been placed

## Previewing the component
Run ```grunt serve``` to start browser and edit the properties of the SDK component

## Creating the SDK component zip file
Run ```grunt dist``` to create a zip file in the dist folder that can be imported into design studio
