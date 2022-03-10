// Required applications
const inquirer = require("inquirer");

// Global variables
function init() {
  // function shenanigans
}

// init
init();

// TODO: Include packages needed for this application
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
];

// TODO: Create a function to write README file
function writeToFile(response) {
  return `# ${response.title}\n${response.licenses}\n\n## Table of Contents\n1. [Project Description](#project-description)\n2. [Installation](#installation)\n3. [Contributing](#contributing)\n4. [Tests](#tests)\n5. [License](#license)\n6. [Contact](#contact)\n\n## Project Description\n${response.description}\n\n## Installation\n${response.usage}\n\n## Contributing\n${response.contribution}\n\n## Tests\n${response.tests}\n\n## License\nThis project uses the ${licenseName}. Click on the link to learn more.\n\n## Contact\nGithub: [github.com/${response.github}](https://github.com/${response.github})  \nEmail: [${response.email}](mailto:${response.email})`;
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((data) => {
    const readme = writeToFile(data);
    console.log(readme);

    fs.writeFile("./output/team-profile.html", readme, (err) =>
      err ? console.log(err) : console.log("Readme Successfully Generated")
    );
  });
}

// Function call to initialize app
init();
