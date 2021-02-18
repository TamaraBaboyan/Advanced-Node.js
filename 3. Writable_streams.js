const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');

readStream.on('data', (chunk) => {
    writeStream.write(chunk)
});

readStream.on('error', (error) => {
    console.log('an error occurred', error.message);
});

readStream.on('end', () => {
    writeStream.end();
});

writeStream.on('close', () => {
    process.stdout.write('file copied!\n');
})

/**
 *  What are we gonna do with all of this data that we've been reading with these readable streams?
 * I hope we're gonna do more than just log it to the console. This is where the readable streams counterpart comes in handy, the writeable stream.
 * Writeable streams represent a destination for incoming data. Writeable streams can be used to capture the data from a readable source and do something
 * with it. Just like readable streams, writeable streams are everywhere. HTTP client request and server responses are writeable streams. 
 * The file system has writeable streams. Process.stdout and stderr, they're writeable streams. And just like readable streams, writeable streams
 * are published in countless NPMs. So let's go ahead and take a look at what it looks like to use a writeable stream. 
 * this is similar to the file that we created earlier. The big difference is is I'm actually destructuring the create read stream function 
 * from the file system as we require it. And the reason that I'm doing this is I also want to create a write stream. So I'm gonna go ahead and 
 * grab create write stream. So let's go ahead and create that write stream. Call it the writeStream and we can use this method to do so,
 * the create write stream method. And if we're reading from a file using the file system's create read stream then we're gonna write to a file 
 * when we use the file system's create write stream. So the goal of this lesson is actually to create a copy of this video.
 * So we'll go ahead and create a copy called copy.mp4 and place that in the local directory. So read streams are designed to read bits of data
 * once chunk at a time whereas write streams are designed to write bits of data one chunk at a time. So let's write it to our write stream.
 * So we will write a chunk. So a binary chunk of our video file will get written one chunk at a time. 
 * Now when our read stream is over we also want to let our write stream know that no more data is coming. 
 * So I'm gonna go ahead and write writeStream.end. And writeable streams also have events we might want to listen for.
 * So I can go ahead and add some of those. writeStream dot on close. So when this write stream is over and it's closed I can go ahead and write 
 * a message to the console without using console.log because process standard output or stdout is also a write stream.
 * In fact console log just wraps around process.stdout to write your streams. So we'll go ahead and say file copied, great.
 * So here we have hooked up a writeable stream to write chunks of data as our readable stream reads it.
 * And when our readable stream has ended we will end our writeable stream and we will handle and close event on our writeable stream and write
 * the final message file copied. Let's go ahead and try to run. And we see file copied. yes we have, a working copy of our mp4!!!
 * 
 * Writeable streams are very important and we definitely want to understand how to use these types of streams.
 */