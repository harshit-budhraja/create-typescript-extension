#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import ora from 'ora';

// Add this to replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Header text with developer information
function printHeader() {
  console.log(''); // Add a blank line for spacing
  console.log(chalk.bold.blue('🚀 Create TypeScript Extension'));
  console.log(chalk.gray('https://github.com/harshitbudhraja/create-typescript-extension'));
  console.log(''); // Add a blank line for spacing
  console.log(chalk.yellow('Made with ❤️ by: Harshit Budhraja'));
  console.log(chalk.cyan('For more such cool stuff, follow me on X (previously Twitter): @harshitbudhraja'));
  console.log(''); // Add a blank line for spacing
}

async function createProject(projectPath: string) {
  // Print header
  printHeader();

  // Ask project details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: path.basename(projectPath),
      validate: (input) => !!input.trim() || 'Project name is required'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Initial version:',
      default: '1.0.0',
      validate: (input) => /^\d+\.\d+\.\d+$/.test(input) || 'Invalid version format'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: 'A chrome extension built with typescript and scaffolded with create-typescript-extension'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name:',
      default: 'Harshit Budhraja'
    }
  ]);

  // Copy template files
  const templateDir = path.resolve(__dirname, '../template');

  // Ensure the project path exists
  await fs.ensureDir(projectPath);
  await fs.copy(templateDir, projectPath);

  // Copy the License and Readme from this current repo
  await fs.copy(path.resolve(__dirname, '../LICENSE'), path.join(projectPath, 'LICENSE'));
  await fs.copy(path.resolve(__dirname, '../README.md'), path.join(projectPath, 'README.md'));

  // Update package.json with project details
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJSON(packageJsonPath);
  
  packageJson.name = answers.projectName;
  packageJson.version = answers.version;
  packageJson.description = answers.description;
  packageJson.author = answers.author;

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });

  // Update manifest.json with project details
  const manifestPath = path.join(projectPath, 'manifest.json');
  const manifest = await fs.readJSON(manifestPath);
  
  manifest.name = answers.projectName;
  manifest.version = answers.version;
  manifest.author = answers.author;
  manifest.description = answers.description;
  
  await fs.writeJSON(manifestPath, manifest, { spaces: 2 });

  // Install dependencies with a progress bar
  const spinner = ora('Installing dependencies...').start();
  try {
    await execa('yarn', ['install'], { cwd: projectPath });
    spinner.succeed('Dependencies installed successfully!');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(chalk.red('Error installing dependencies:'), error);
  }

  // Print success message
  console.log(''); // Add a blank line for spacing
  console.log(chalk.green(`✅ Project ${answers.projectName} created successfully!\n`));
  console.log(chalk.white('Next steps:'));
  console.log(chalk.cyan(`Go to the project directory: cd ${projectPath}`));
  console.log(chalk.cyan(`Run the project: yarn dev`));
}

program
  .name('create-typescript-extension')
  .description('CLI to scaffold a TypeScript browser extension')
  .argument('[path]', 'Project path (default: current directory)', process.cwd())
  .action(async (projectPath = process.cwd()) => {
    try {
      await createProject(path.resolve(projectPath));
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv); 