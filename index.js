const fs = require("fs");
const inquirer = require("inquirer")

function chooseBadge(answers) {
  switch (answers.license) {
    case 'Appache License 2.0':
      badge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
      break;
    case 'BSD 2-Clause "Simplified" or "FreeBSD" license':
      badge = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'
      break;
    case 'GNU General Public license (GPL)':
      badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
      break;
    case 'MIT license':
      badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
      break;
    case 'Mozilla Public license 2.0':
      badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
      break;
    case 'Common Development and Distribution license':
      badge = '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'
      break;
    case 'Eclipse Public license':
      badge = '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
      break;
    case 'none':
      badge = ''
      break;
    default:
      badge = ''
  }
}

function cleanUp(answers) {
  if (answers.title === "none" || answers.title === "") answers.title = "Title TBD"
  if (answers.description === "none" || answers.description === "") answers.description = "TBD"
  if (answers.installation === "none" || answers.installation === "") answers.installation = "TBD"
  if (answers.usage === "none" || answers.usage === "") answers.usage = "TBD"
  if (answers.contributing === "none" || answers.contributing === "") answers.contributing = "This project is not yet open to collaboration"
  if (answers.tests === "none" || answers.tests === "") answers.tests = "No Tests have been established for this application"

  if (answers.license !== 'none') {
    answers.license = `This project is under the ${answers.license} attached in the repository.`
  } else {
    answers.license = 'This project is not allowed to be used or edited by anyone under any circumstances.'
  }
}

function generateREADME(answers) {
  data = `
  # ${answers.title} ${badge}
  ## Description
  ${answers.description}
  ## Table of Contents
  - [Installation](##Installation)
  - [Usage](##Usage)
  - [Contributing](##Contributing)
  - [Tests](##Tests)
  - [Questions](##Questions)
  - [License](##License)
  ## Installation
  ${answers.installation}
  ## Usage
  ${answers.usage}
  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  If you would like to contact me or view other projects I'm working on, you can explore my repositories at [${answers.gitUser}](https://github.com/${answers.gitUser}), or email me at ${answers.email}.
  ## License
  ${answers.license}`

  return data;
}

inquirer
  .prompt([
    {
      type: 'input',
      message: "This application will help generate a Proffesional README.md based on your choices. If a section isn't needed for your project type/select none.  ",
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
      type: 'input',
      message: 'What is your GitHub username?',
      name: 'gitUser',
    },
    {
      type: 'input',
      message: 'What email address would you like to be contacted at?',
      name: 'email',
    },
    {
      type: 'list',
      message: 'Would you like to include a license?',
      choices: [
        'Appache License 2.0',
        'BSD 2-Clause "Simplified" or "FreeBSD" license',
        'GNU General Public license (GPL)',
        'MIT license',
        'Mozilla Public license 2.0',
        'Common Development and Distribution license',
        'Eclipse Public license',
        'none'],
      name: 'license',
    },
  ])
  .then((answers) => {
    let badge = ''
    chooseBadge(answers)
    cleanUp(answers)

    fs.writeFile('./Generated/README.md', generateREADME(answers), (err) =>
      err ? console.log(err) : console.log('Professional README generated!')
    );
  });