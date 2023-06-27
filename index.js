// Required packages for project 
const inquirer = require("inquirer");
const fs = require("fs");

// Leads path to required files for shape modeling
const { Triangle, Square, Circle } = require("./lib/shape");

// Function that takes user input from prompts to provide shape information 
function writeToFile(fileName, answers) {
  
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  
  svgString += "<g>";
  svgString += `${answers.shape}`;

  // Takes user input from prompt to add shape style to svg file
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  // Use of text tag to align text 
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  //Use of fs to create file 
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

//Function to generate the answers using prompts for user input
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:"Enter text to display, Up to 3 characters",
        name: "text",
      },
      {
        type: "input",
        message:"Choose text color or hex code",
        name: "textColor",
      },
      {
        type: "list",
        message: "Choose a shape",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message:"Enter a shape color or hex code",
        name: "shapeBackgroundColor",
      },
    ])
    //Generates logo.svg file
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}
//starting function 
promptUser();