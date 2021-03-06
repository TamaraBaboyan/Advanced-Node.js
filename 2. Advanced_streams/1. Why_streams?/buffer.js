var fs = require('fs');
var http =  require('http');
var file = '../../powder-day.mp4';

/**
 *  what we're trying to do is move data from a source to a destination. The source is the powder-day.mp4 video, and we've declared a reference 
 * to that on line three, and the destination is going to be a HTTP response. The actual data is getting sent to the destination on line 20 
 * when we end the response. So, we're creating a HTTP server that runs on Port 3000 and it's how we get the file that matters. 
 * So we're using the FS.read file, which is going to read the entire contents of the MP4 video into a single variable. That variable is data,
 * so that's our buffer, and we're sending the entire data back on line 20, once we have the entire contents of the movie loaded.
 * 
 * So let's take a look at what this does to memory. 
 */

http.createServer((req, res) => {

    fs.readFile(file, (error, data) => {
        if (error) {
            console.log('hmmmm: ', error);
        }
        res.writeHeader(200, { 'Content-Type': 'video/mp4' });
        res.end(data);
    })

}).listen(3000, () => console.log('buffer - http://localhost:3000'));

/**
 * I'm gonna go ahead and start the node process for buffer.js by typing 
 * $ node - -trace _gc buffer .js. 
 * 
 * The trace gc command is gonna trace garbage collection on this process, so we can see how our garbage collector is working.
 * I'm goint to open 5 browser tabs with http://localhost:3000
 * Here we go. So we have five requests running, all getting the video. So let's take a look at what's happening.So inside of the terminal window,
 * you're gonna notice two types of garbage collection. We have Scavenge, and we have Mark-sweep. And you're gonna notice that we have actually,
 * a lot of these Mark-sweeps. So this Mark-sweep is actually a much bigger deal because Mark-sweep is gonna stop your node process 
 * to clean up a lot of garbage. The Scavenge doesn't clean up as much garbage.
 * We're also gonna notice that we're using 157 megabytes of memory. So, that's how we handle this with the buffer.
 */
