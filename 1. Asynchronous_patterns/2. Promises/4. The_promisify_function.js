/**
 * This "Promisify" utility is very useful and very effective.
 * we can use this utility with Nodejs filesystem module "fs", as Nodejs fs module uses callback, we can convert them into promise.
 * 
 */

var fs = require('fs');
var { promisify } = require('util');

var writeFile = promisify(fs.writeFile);

writeFile('sample.txt', 'This is a sample')
  .then(() => console.log('file successfully created'))
  .catch((error) => console.log('error creating file'));
