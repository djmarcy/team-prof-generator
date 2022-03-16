// Required applications
const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const fs = require("fs");
const team = {
  manager: "",
  interns: [],
  engineers: [],
};

function generateHTML() {
  const content =
    `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <link rel="stylesheet" href="../assets/style.css">

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css"
        integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">

      <title>Team Profile Generator</title>
  </head>

  <header>
    <h1>Team Profile Generator</h1>
  </header>

  <body>
  <section class="manager-section">
    <h2>Manager</h2>
    <p><b>Manager Name:</b> ${team.manager.getName()}</p>
    <p><b>Manager ID:</b> ${team.manager.getId()}</p>
    <p><b>Manager Email:</b> <a href="mailto:${team.manager.getEmail()}">${team.manager.getEmail()}</a></p>
    <p><b>Manager Office:</b> ${team.manager.getOfficeNum()}</p>
  </section>
  
  <section>
  <h3>Engineers</h3>
  <div class="append-engineers">
  ` +
    team.engineers
      .map((element) => {
        return `<div class="intern-card">
        <p><b>Engineer Name:</b> ${element.getName()}</p>
        <p><b>Engineer ID:</b> ${element.getId()}</p>
        <p><b>Engineer Email:</b> <a href="mailto:${element.getEmail()}">${element.getEmail()}</a></p>
        <p><b>Engineer Github:</b> <a href="${element.getGithub()}">${element.getGithub()}</a></p>
       </div>`;
      })
      .join("") +
    `</div>
    </section>
      
    <hr />
      
  <section>
  <h3>Interns</h3>
  <div class="append-interns">
  ` +
    team.interns
      .map((element) => {
        return `<div class="intern-card">
        <p><b>Intern Name:</b> ${element.getName()}</p>
        <p><b>Intern ID:</b> ${element.getId()}</p>
        <p><b>Intern Email:</b> <a href="mailto:${element.getEmail()}">${element.getEmail()}</a></p>
        <p><b>Intern School:</b> ${element.getSchool()}</p>
       </div>`;
      })
      .join("") +
    `</div>
    </section>
          
    <hr />

    </body>

    <footer>&copy 2022 Marcy Web Dev</footer>`;

  fs.writeFile("./output/team-profile.html", content, (err) =>
    err ? console.log(err) : console.log("Readme Successfully Generated")
  );

  console.log(team);
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
];

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
  },
];

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
];

function init() {
  inquirer.prompt(managerQuestions).then((answers) => {
    team.manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNum
    );

    switch (answers.newEmployee) {
      case "Engineer":
        addEngineer();
        break;

      case "Intern":
        addIntern();
        break;
    }
  });
}

// Intern Questions function
function addIntern() {
  inquirer.prompt(internQuestions).then((answers) => {
    team.interns.push(
      new Intern(answers.name, answers.id, answers.email, answers.school)
    );

    switch (answers.addMore) {
      case "Engineer":
        addEngineer();
        break;

      case "Intern":
        addIntern();
        break;

      case "Finished Entering Team":
        console.log(team);
        generateHTML();
        break;
    }
  });
}

// Engineer Questions function
function addEngineer() {
  inquirer.prompt(engineerQuestions).then((answers) => {
    team.engineers.push(
      new Engineer(answers.name, answers.id, answers.email, answers.github)
    );

    switch (answers.addMore) {
      case "Engineer":
        addEngineer();
        break;

      case "Intern":
        addIntern();
        break;

      case "Finished Entering Team":
        console.log(team);
        generateHTML();
        break;
    }
  });
}

// Function call to initialize app
init();

// manager questions --> managet obj. stored in array --> next employee --> Engineer/Intern --> save as obj. --> next employee --> repeats --> no more employees are need --> fs.writeFile
