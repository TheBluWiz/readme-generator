const fs = require("fs");
const inquirer = require("inquirer")

function generateREADME(answers) {
  data = `# ${answers.title}
  ## Description
  ${answers.description}
  ## Table of Contents
  [Installation](##Installation)
  [Usage](##Usage)
  [Contributing](##Contributing)
  [Tests]( ##Tests)
  [Questions](##Questions)
  [License](##License)
  ## Installation
  ${answers.installation}
  ## Usage
  ${answers.usage}
  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.questions}
  ## License
  ${answers.license}`

  return data;
}

function cleanUp(answers) {
  if (answers.title === "") answers.title = "Title TBD"
  if (answers.description === "") answers.description = "TBD"
  if (answers.installation === "") answers.installation = "TBD"
  if (answers.usage === "") answers.usage = "TBD"
  if (answers.contributing === "") answers.contributing = "This project is not yet open to collaboration"
  if (answers.tests === "") answers.tests = "No Tests have been established for this application"
  answers.license = `This project is under the ${answers.license} attached in the repository.`
}

inquirer
  .prompt([
    {
      type: 'input',
      message: "This application will help generate a Proffesional README.md based on your choices. If a section isn't needed for your project type/select none.",
      name: 'splash',
    },
    {
      type: 'input',
      message: 'What is your project name?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Please describe your project.',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Please list any special installation instructions.',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'How is your application used?',
      name: 'usage',
    },
    {
      type: 'input',
      message: 'Do you have instructions or reccomendations for those who would like to contribute?',
      name: 'contributing',
    },
    {
      type: 'input',
      message: 'Have you included any tests?',
      name: 'tests',
    },
    {
      type: 'list',
      message: 'Would you like to include a license?',
      choices: [
        'Appache License 2.0',
        'BSD 2-Clause "Simplified" or "FreeBSD" license',
        'GNU General Public license (GPL)',
        'GNU Library or "Lesser" general Public license (LGPL',
        'MIT license',
        'Mozilla Public license 2.0',
        'Common Development and Distribution license',
        'Eclipse Public license'],
      name: 'license',
    },
  ])
  .then((answers) => {
    console.log(answers)
    cleanUp(answers)

    fs.writeFile('README.md', generateREADME(answers), (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });