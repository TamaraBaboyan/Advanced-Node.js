const { Duplex, PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4')
const writeStream = createWriteStream('./copy.mp4');

class Throttle extends Duplex{

    constructor(ms) {
        super();
        this.delay = ms;
    }

    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay)
    }

    _read() {}

    _final() {
        this.push(null)
    }

}

const report = new PassThrough();
const throttle = new Throttle(100);

let total = 0;

report.on("data", (chunk) => {
    total += chunk.length;
    console.log("bytes: ", total)
})

readStream
    .pipe(throttle)
    .pipe(report)
    .pipe(writeStream);

/**
 So duplex streams help us compose streams into pipelines.
 
 Let's say we actually want to slow this whole thing down. We can create another type of duplex steam called throttle.
 
 So we'll create something called throttle, and here's an instance of it, and we will go ahead and send it 
 10 or any aother delay milliseconds. So let's say we want it to slow this whole thing down. So we'll add throttle to our pipeline.
 So we're gonna start with the read stream, and that's gonna be passed through the throttle duplex stream, and then passed through the report 
 duplex stream, and then eventually we'll get to our write stream where the file copy is made. So in order to do this, we need to create 
 a new throttle type and we're gonna create a duplex stream type. So class throttle extends duplex. When we implement a duplex stream class.

 
 So we will actually write the chunks of data as they're received, and what we'll do is call the callback to let us know that,
 that write has been completed. So in order to actually have a delay here, what I wanna do is I wanna set a timeout around this callback.
 So I'm gonna call setTimeout, and we will invoke the callback when the timeout is finished and the timeout is going to be this.delay.
 Now the other thing that we want to implement here is another method called final. And final means that we are getting no more data from 
 the read stream, so we also want to clear out our write stream. I'm gonna go ahead and call this.push(null) so that we can see that the 
 write stream has ended. Now I'm not gonna do anything on the read side. We're just gonna currently read the data as it comes into this throttle,
 and then we shall throttle it. So we're going to write one chunk at a time, but we're gonna make the chunk delay for a little bit.
 
 Now you can see the  bytes have really slowed down. That's because we have sent our stream through a throttle and then we're actually seeing 
 those bytes because we've also sent our stream through a report. So if I were to take this pass through throttle and set it to 100 milliseconds,
 and save it. Come over here, clear out our terminal and run it one more time. Now we can see that we've really throttled our stream and
 we are only allowing it to write bytes really slow. So duplex streams are a necessary component when you want to compose streams into complex 
 pipelines. The duplex stream implements both a readable and a writable side, and therefore they represent the center parts of a pipeline.
 */

 