var fs = require('fs');
var { promisify } = require('util');
var readdir = promisify(fs.readdir);
var delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
})

Promise.race([
    delay(5),
    delay(2),
    delay(3),
    delay(5)
  ]).then(() => readdir(__dirname))
    .then(console.log);
  