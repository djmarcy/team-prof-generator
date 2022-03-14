// Required applications
const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const fs = require("fs");
const team = {
  manager: [],
  interns: [],
  engineers: [],
}

function generateHTML() {

  const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
  <h1>Team Profile Generator</h1>
  <hr />`

  fs.writeFile("./output/team-profile.html", content, (err) =>
  err ? console.log(err) : console.log("Readme Successfully Generated")
  );

  const appendManager = `<h2>Manager:</h2>
  <p><b>Manager Name:</b> ${team.manager.name}</p>
  <p><b>Manager ID:</b> ${team.manager.id}</p>
  <p><b>Manager Email:</b> ${team.manager.email}</p>
  <p><b>Manager Office:</b> ${team.manager.officeNum}</p>
  <hr />`

  fs.appendFile("./output/team-profile.html", appendManager, (err) =>
  err ? console.log(err) : console.log("Manager added successfully!")
  );

  const appendIntern = () => {
      return `<section class="append-interns">` + team.interns.forEach(element => {
          `<div class="intern-card">
          <p><b>Intern Name:</b> ${team.interns.name}</p>
          <p><b>Intern ID:</b> ${team.interns.id}</p>
          <p><b>Intern Email:</b> ${team.interns.email}</p>
          <p><b>Intern School:</b> ${team.interns.school}</p>
          </div>` + `</section>
          <hr />` 
      });
  }

  fs.appendFile("./output/team-profile.html", appendIntern(), (err) =>
  err ? console.log(err) : console.log("Interns added successfully!")
  );

  const appendEngineer = () => {
      return `<section class="append-engineers">` + team.engineers.forEach(element => {
          `<div class="intern-card">
          <p><b>Intern Name:</b> ${team.engineers.name}</p>
          <p><b>Intern ID:</b> ${team.engineers.id}</p>
          <p><b>Intern Email:</b> ${team.engineers.email}</p>
          <p><b>Engineer Github:</b> <a href="${team.engineers.github}">${team.engineers.github}</a></p>
          </div>` + `</section>
          <hr />`
      });
  }

  fs.appendFile("./output/team-profile.html", appendEngineer(), (err) =>
  err ? console.log(err) : console.log("Engineers added successfully!")
  );

  const htmlEnd = `</body>
  <footer>&copy Marcy Web Dev 2022</footer>`

  fs.appendFile("./output/team-profile.html", htmlEnd, (err) =>
  err ? console.log(err) : console.log("Team profile page ready!")
  );

  console.log(team)

}

// TODO: Create an array of questions for user input
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Manager Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Manager ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Email Address:",
  },
  {
    type: "input",
    name: "officeNum",
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
    name: "name",
    message: "Intern Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Intern ID:",
  },
  {
    type: "input",
    name: "email",
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
      name: "name",
      message: "Engineer Name:",
    },
    {
      type: "input",
      name: "id",
      message: "Engineer ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Email Address:",
    },
    {
      type: "input",
      name: "github",
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
    
    team.manager.push(new Manager(answers.name, answers.id, answers.email, answers.officeNum))

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
        team.interns.push(new Intern(answers.name, answers.id, answers.email, answers.school))

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
          team.engineers.push(new Engineer(answers.name, answers.id, answers.email, answers.github))

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

// Function call to initialize app
init();

// manager questions --> managet obj. stored in array --> next employee --> Engineer/Intern --> save as obj. --> next employee --> repeats --> no more employees are need --> fs.writeFile
