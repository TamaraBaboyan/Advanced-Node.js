 /**
  * So actually Node JS has read streams everywhere. Standard input or stdin is a read stream. So that's why we can listen for data events.
  * And with standard input, just like with every other stream, each chunk of data is actually being passed to this call back handler.
  * 
  * So we notice that this stream is a little bit different. We're still sending data chunk by chunk, but we have to ask for the next chunk.
  * So this stream is in non-flowing mode. When a stream is in flowing mode, it automatically pushes each chunk of data into the pipeline.
  * Non-flowing streams mean that we have to ask for the data. So we can actually enter any stream into non-flowing or flowing mode. 
 */

const fs = require('fs');

const readStream = fs.createReadStream('../../powder-day.mp4');

readStream.on('data', (chunk) => {
    console.log('size:', chunk.length);
})

readStream.on('end', () => {
    console.log('read stream finished');
})

readStream.on('error', (error) => {
    console.log('an error has occured');
    console.error(er)
})

readStream.pause();

/** Let's to an interesting update to the last snippet */
process.stdin.on('data', (chunk) => {
    if (chunk.toString().trim() === 'finish') {
        readStream.resume();
    }
    readStream.read();
})

/**
 * This is what happens:
 * we're going to listen inside a process stdin. In case the text and we'll go ahead and call this chunk dot toString dot trim is equal to the word finish.
 * Then we can actually enter any stream back into flowing mode by typing readStream of the name of the stream resume.
 * So pause enters it into non-flowing mode and resume will convert it back into flowing mode. So let's see what happens. Let's go over here to our terminal.
 * Type node dot to run the application. So every time I hit enter, I'm reading one small chunk of the video.
 * But, if I type finish and hit enter, the stream enters back into flowing mode and begins to push the rest of the chunks of the video automatically.
 * 
 * Readable streams are everywhere. Learning to work with readable streams is an essential skill for a Node JS developer.
 */


