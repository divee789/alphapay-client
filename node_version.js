/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const requiredNodeVersion = packageJson.engines.node;

const runningNodeVersion = process.version;
fs.writeFileSync(path.join(__dirname, '.node-version'), requiredNodeVersion, 'UTF8');
fs.writeFileSync(path.join(__dirname, '.nvmrc'), requiredNodeVersion, 'UTF8');

if (runningNodeVersion !== `v${requiredNodeVersion}`) {
  console.error(`You are not running the required version of Node, please use version ${requiredNodeVersion}.`);
  process.exit(1);
}
