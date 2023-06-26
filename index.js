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

    // Takes user input and adds polygon properties and colors 
    let shapeChoice;
    if (answers.shape === 'Triangle') {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rec x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;   
    } else {
        shapeChoice = new Circle();
        svgString =+ `<circle cx="150"cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
    //text tag allows for uniform text format 
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40"fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    //using fs to make svg 
    fs.writeFile(fileName,svgString, (err)=> {
        err ? console.log(err) : console.log("Created logo.svg");
    });
}

//Using Inquirer to send questions on command line using prompts
function promptUser() {
    inquirer 
    .prompt([
        {
            type:"input",
            message:"Enter Text to display. (Up to three Characters)",
            name: "text",
        },
        {
            type:"input",
            message: "Enter text color or hexdecimal number.",
            name: "textColor",
        },
        {
            type:"list",
            message: "Select a shape to display.",
            choices: ["Circle", "Triangle", "Square"],
            name:"shape",
        },
        {
            type:"input",
            message: "Enter a shape color or hexdecimal number.",
            name: "shapeBackgroundColor",
        },
    ])
    .then((answers)=> {
        if (answers.text.length > 3) {
            console.log("Must provide a value of no more than 3 characters");
            promptUser();
        } else {
            writeTOFIle("logo.svg",answers);
        }
    });
}
//Starting Function
promptUser();