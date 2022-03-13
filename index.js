// Required applications
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "Manager Name:",
  },
  {
    type: "input",
    name: "managerID",
    message: "Manager ID:",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "Email Address:",
  },
  {
    type: "input",
    name: "managerOffice",
    message: "Office Number:",
  },
  {
    type: "list",
    name: "newEmployee",
    message: "What type of employee would you like to input next?",
    choices: ["Engineer", "Intern"],
  },
];

// TODO: Create a function to write README file
function writeToFile(response) {
  // Return HTML page
  return ``;
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(managerQuestions)
    .then((answers) => {
      console.log(answers.newEmployee);
      switch (answers.newEmployee) {
        case "Engineer":
          engineerQuestions();
          break;

        case "Intern":
          internQuestions();
          break;
      }
    })
    .then((data) => {
      const readme = writeToFile(data);
      console.log(readme);

      fs.writeFile("./output/team-profile.html", readme, (err) =>
        err ? console.log(err) : console.log("Readme Successfully Generated")
      );
    });
}

// Intern Questions function
function internQuestions() {
  // Inquirer prompts go here
  //
}

// Engineer Questions function
function engineerQuestions() {
  // Inquirer prompts go here
  //
}

// Function call to initialize app
init();

// manager questions --> managet obj. stored in array --> next employee --> Engineer/Intern --> save as obj. --> next employee --> repeats --> no more employees are need --> fs.writeFile
