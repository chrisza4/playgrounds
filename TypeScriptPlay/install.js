'use strict'
const execSync = require('child_process').execSync

function run (packageName) {
  console.log(`Installing typings ${packageName}....`)
  execSync(`typings install dt~${packageName} --global --save`)
  console.log(`Installing node package ${packageName}....`)
  execSync(`npm install --save ${packageName}`)
  console.log('Done deal!!')
}

run(process.argv[2])
process.exit()