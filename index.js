const fs = require("fs");
const inquirer = require("inquirer")

function generateREADME(answers) {
  data = `# ${answers.title}
  ## Description
  ${answers.description}
  ## Table of Contents
  ${tableOfContents}
  ## Installation
  ${answers.installation}
  ## Usage
  ${answers.usage}
  ## License
  ${answers.license}
  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.questions}`

  return data;
}

inquirer
  .prompt([
    {
      type: 'input',
      message: "This application will help generate a Proffesional README.md based on your choices. If a section isn't needed for your project type/select none.",
      name: 'title',
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
    {
      type: 'input',
      message: 'Are there any contributers to your code? Do you have instructions or rules for those who would like to contribute?',
      name: 'contributing',
    },
    {
      type: 'input',
      message: 'Have you included any tests?',
      name: 'tests',
    },
  ])
  .then((answers) => {
    let tableOfContents = answers.filter(answer => answer !== "");
    tableOfContents.toString()
    tableOfContents.replace(',/g'`\n`)

    console.log(generateREADME(answers));

    // fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
    //   err ? console.log(err) : console.log('Success!')
    // );
  });




// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init() { }

// Function call to initialize app
init();
