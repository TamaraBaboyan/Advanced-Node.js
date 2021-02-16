var fs = require('fs');
var { promisify } = require('util');
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var readdir = promisify(fs.readdir);
var delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
})

Promise.all([
    writeFile('Hello', 'Hello my dear!!!'),
    writeFile('Bonjour', 'Bonjour mon cherie'),
    writeFile('Readme.json', '{ "hello": "world" }'),
    delay(3),
    writeFile('Marhaba', 'Barhaba habibi')
])
.then(() => readdir(__dirname))
.then(console.log)
.then(() => Promise.all[
    unlink('Hello'),
    unlink('Bonjour'),
    delay(3),
    unlink('Marhaba')
])
.then(() => console.log('removed'))
