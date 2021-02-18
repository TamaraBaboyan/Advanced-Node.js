var fs = require('fs');
var http =  require('http');
var file = '../../powder-day.mp4';

http.createServer((req, res) => {

    res.writeHeader(200, { 'Content-Type': 'video/mp4' });
    fs.createReadStream(file)
        .pipe(res)
        .on('error', console.error);

}).listen(3000, () => console.log('stream - http://localhost:3000'));

/**
 *  So let's go ahead and take a look at the stream example. So, the only difference in the stream example is on line eight,
 * we're creating a read stream with the file system. So that will read this file bit by bit, and send those bits to the client as soon as they get them.
 * So let's go ahead and try this again. Let's come back out to our terminal. And this time, we're gonna:
 * $ node - -trace _gc stream.js. And we have that running in localhost:3000. So I'll come over here to localhost, and we're gonna make the same five requests.
 * So what you'll notice is we have some Scavenge garbage collection, but we don't have any Mark-sweeps.
 * And again, Scavenge is a quicker version of the garbage collector that runs on a smaller bit of memory.
 * You can almost think of it as like your short-term memory for your application. The Mark-sweep is a bigger deal, and we don't see any of those.
 * Additionally, if we come over to the activity monitor, you will notice that we're only using 40 megabytes of memory.
 * So that's significantly less memory. And the reason is we aren't loading the entire contents of each video file before we're sending it,
 * we're sending it bit by bit. So, in order to create performant applications, streams are absolutely essential.
 */
