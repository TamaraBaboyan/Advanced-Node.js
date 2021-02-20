const { PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../powder-day.mp4')
const writeStream = createWriteStream('./copy.mp4');

const report = new PassThrough();

let total = 0;

report.on("data", (chunk) => {
    total += chunk.length;
    console.log("bytes: ", total)
})

readStream.pipe(report).pipe(writeStream);

/**
 A duplex stream is a stream that implements both a readable and a writable. These streams allow data to pass through.
 Readable streams will pipe data into a duplex stream, and the duplex stream can also write that data. So duplex stream represent
 the middle sections of pipelines. I'm looking at the code that we created in the last lesson where we pipe from out read stream.
 Which is reading a video, powder-day.mp4, to our write stream, which is creating a copy of that video. What we're gonna go ahead and do 
 is implement a duplex stream here. Now, we're gonna go ahead and grab the most basic type of duplex stream, which is a pass through.
 And we can get that from our stream module. And what we can do is create a new pass through stream called report.
 And when I say they represent the middle sections of a pipe line, that means that we can put them in between readables and writables.
 So a duplex stream can be piped between a readable and a writable. So it means that this duplex stream can receive data from our read 
 stream and then send that data to our write stream. So what would be the point of implementing a pass through stream if we wanted to see 
 something about the data or report on it. A typical duplex stream doesn't change anything about the data. There's a type of duplex stream 
 called transform streams, which we will cover in greater detail in the next snipet, and technically the pass through is a transform stream,
 but we're just gonna use it as a basic duplex stream in this example.
 So what I'm gonna do is create a total variable equal to zero, and then the report has an on data event because it's a readable and a writable 
 stream. So I can listen for when data comes into this report stream and get that data chunk by chunk. So what I'm gonna go ahead and do is 
 increment our total so we can see how much data has passed through. And then we'll also go ahead and console log how many bytes of data have 
 currently passed through by logging our total. There we go. So now we can actually see some reporting on how many bytes are passing through 
 our duplex stream. So I'm gonna come over here to the terminal and type node, dot, and we can see that all of these bytes have passed through 
 the stream. So we still get the copy. We've still copied the file, but the, but the pass through has provided some reporting.
 
 */
