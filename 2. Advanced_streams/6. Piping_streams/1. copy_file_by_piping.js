const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');

readStream.pipe(writeStream).on('error', console.error);

/**
 You may be thinking to yourself that streams seem fun, but there's an awful lot of code that you have to use to implement a stream, 
 and you have to worry about back pressure that seems a little complicated. And what I'm gonna say is,
 we can actually just delete all of these handlers, because we don't need them. And I'm gonna delete this reference to a high water mark,
 because we also don't need it. I can pipe a read stream to a write stream, simply by typing readStream.pipe(writeStream). 
 So again, what we're doing is the same thing. Instead of wiring up a bunch of listeners to listen for chunks of data and then pass those 
 chunks of data into the write stream, the pipe method is doing it for us. The pipe method also automatically handles back pressure for us.
 The only thing that we didn't do is wire up an err listener, so I can just do this on the end of a pipe method. So when any error occurs,
 we can handle it by logging it to the console. So now we have the same program. you can see that we have our copy.mp4.
 
 So any read stream can be piped to any write stream
 */