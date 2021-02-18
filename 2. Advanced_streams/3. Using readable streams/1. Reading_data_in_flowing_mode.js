 /**
 * In the last lesson we saw how we can create classes that extend stream.readable to build our own readable streams.
 * Now, sometimes you'll build your own readable streams, but most of the time you're going to use already existing stream types.
 * You've already been doing this. Node JS comes with all types of readable streams. Http requests on the server and a response on the client,
 * they're readable streams. The file system has readable streams. Zipping and unzipping uses readable streams. TCP sockets, process stdin,
 * not to mention the many MPMs that implement readable streams. So let's go ahead and implement our own instance of a readable stream that already exists.
 * 
 * now we're using an existing readable stream but you know that the interface is exactly like the one that we created.
 * We're listening for specific events. The data event, the end event, and the error event.
 */

const fs = require('fs');

const readStream = fs.createReadStream('../../powder-day.mp4');

readStream.on('data', (chunk) => {
    console.log('Reading little chunk\n', chunk);
    /** we can log size of each chunk */
    console.log('size:', chunk.length);
})

readStream.on('end', () => {
    console.log('read stream finished');
})

readStream.on('error', (error) => {
    console.log('an error has occured');
    console.error(er)
})
