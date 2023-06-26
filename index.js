//Import Inquirer and file systme
const inquirer = require('inquirer');
const fs = require('fs');

// import classes from shape.js
const {Triangle, Square, Circle } = require('./lib/shape');

//function that writes Svg file using answers from the prompts
function writeTOFIle(fileName, answers) {
    let svgString = '';
    //width and height of svg
    svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    //keeps text in proper place using g tags 
    svgString += '<g>';
    //takes shape input
    svgString += '${answers.shape}';
}