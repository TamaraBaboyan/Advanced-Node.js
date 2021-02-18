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

/**
 *  So let's take the readStream, this is currently in flowing mode, and by invoking "pause" on it, we are now creating our readStream 
 * as a non-flowing mode stream. So that means we're going to have to ask for bits of data. I'm actually going to do this right here inside of 
 * process standard input. So if I want to ask for a bit of data, I can call readStream.read. 
 * 
 * what you'll notice is, we haven't read any of the video. We don't see the chunk links. But as I hit enter, I'm asking for one little bit of the video,
 * one bit at a time. So I have, by pausing the readStream, made it enter into non-flowing mode. 
 */

readStream.pause();

process.stdin.on('data', (chunk) => {
    readStream.read();
})
