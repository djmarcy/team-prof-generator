// Required applications
const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const team = {
  manager: [],
  interns: [],
  engineers: [],
}

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
]

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "Intern Name:",
  },
  {
    type: "input",
    name: "internID",
    message: "Intern ID:",
  },
  {
    type: "input",
    name: "internEmail",
    message: "Email Address:",
  },
  {
    type: "input",
    name: "school",
    message: "School:",
  },
  // Determine what to do next
  {
    type: "list",
    name: "addMore",
    message: "What type of employee would you like to input next?",
    choices: ["Engineer", "Intern", "Finished Entering Team"],
  }]

  const engineerQuestions = [
    {
      type: "input",
      name: "engineerName",
      message: "Engineer Name:",
    },
    {
      type: "input",
      name: "engineerID",
      message: "Engineer ID:",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Email Address:",
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is the engineer's Github profile?",
    },
    {
      type: "list",
      name: "addMore",
      message: "What type of employee would you like to input next?",
      choices: ["Engineer", "Intern", "Finished Entering Team"],
    },
  ]

function init() {
inquirer
.prompt(managerQuestions)
  .then((answers) => {
    
    team.manager.push(new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice))

    switch (answers.newEmployee) {
      case "Engineer":
        addEngineer();
        break;

      case "Intern":
        addIntern();
        break;
    }
  })
};

// Intern Questions function
function addIntern() {
  inquirer
    .prompt(internQuestions)
      .then((answers) => {
        team.interns.push(new Intern(answers.internName, answers.internID, answers.internEmail, answers.school))

        switch (answers.addMore) {
          case "Engineer":
            addEngineer();
            break;
    
          case "Intern":
            addIntern();
            break;

          case "Finished Entering Team":
            console.log(team)
            generateHTML();
            break;
        }
      })
}

// Engineer Questions function
function addEngineer() {
  inquirer
    .prompt(engineerQuestions)
        .then((answers) => {
          team.engineers.push(new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub))

          switch (answers.addMore) {
            case "Engineer":
              addEngineer();
              break;
      
            case "Intern":
              addIntern();
              break;
  
            case "Finished Entering Team":
              console.log(team)
              generateHTML();
              break;
          }
        })
}

// TODO: Create a function to write README file
function generateHTML() {
  // Return HTML page
  console.log(team)
  return ``;
}

// Write to HTML
      // const readme = writeToFile(data);
      // console.log(readme);

      // fs.writeFile("./output/team-profile.html", readme, (err) =>
      //   err ? console.log(err) : console.log("Readme Successfully Generated")
      // );

// Function call to initialize app
init();

// manager questions --> managet obj. stored in array --> next employee --> Engineer/Intern --> save as obj. --> next employee --> repeats --> no more employees are need --> fs.writeFile
