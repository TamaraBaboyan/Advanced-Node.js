const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4',
// {
//     highWaterMark: 17624321421
// }
);

readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk);
    if (!result) {
        console.log('Backpressure!');
        readStream.pause();
    }
});

readStream.on('error', (error) => {
    console.log('an error occurred', error.message);
});

readStream.on('end', () => {
    writeStream.end();
});

writeStream.on('drain', () => {
    console.log('Drained!');
    readStream.resume()
})

writeStream.on('close', () => {
    process.stdout.write('file copied\n');
})

/**
 Sometimes the data coming from a readable stream is too fast for a writable stream to handle. Using our water bucket example,
 imagine pouring water into the hose. So we're pouring water from our source bucket to our destination. Now let's say we're pouring 
 the water too fast and the hose begins to back up, what should we do, should we keep pouring the water in? 
 Well doing that will cause an overflow and we'll loose all of our water. Instead what we actually want to do is stop pouring water in 
 until it's drained. So here we have the hose, it's full, our source has stopped pouring water in until all that water can make it 
 to the destination and then we'll start pouring water in from our source again. And again once our hose has been full we'll stop pouring 
 the water in and we'll repeat this process until all of the water pipes through the hose from our source to our destination.
 Whenever we actually have a full hose, this is referred to as back pressure, and how much water our hose can handle is referred to as 
 the high water mark. By setting a large high water mark essentially what you're doing is creating a very big hose that can handle all 
 of the water that's passed to it. Let's take a look at this in a code example. In the last lesson we built a writable stream that we 
 can use to actually copy the data from powder day to our copy. And what we have going on here is a little bit of back pressure. 
 We can't see that it's happening in the terminal but if we were to take a look at memory we could see back pressure causing problems. 
 What we're gonna do is actually handle that. Here's the file that we created in the last lesson. Our writestream.write method will let us 
 know whether the hose is full or not. It will return a true or false value as to whether it can handle more data.
 I can capture that value as a result. If this result is false that means that our hose is full. What I wanna do is say if we don't have 
 a result then our hose is full so I need to tell our read stream to stop pouring water in it. So we can pause the read stream so we're not gonna 
 actually read any more data until our hose drains. We'll do a little console log here just so we can see that we have back pressure.
 So how do we know when to start pouring data in again? Well we can listen for a drain event on the write stream.
 When our write stream drains this function will fire and we can handle that event with this callback. Console.log, drain, and we'll also tell 
 our read stream to resume. This process will continue until all of the data has been passed from our read stream to our write stream.
 Let's take a look. So I'm coming over here to the terminal and we'll type node dot. And what you'll notice is we have a lot of back pressure.
 Every time there was back pressure instead of creating more memory or taking up more memory now we simply pause the read stream until 
 the write steam can handle that much data. Now when we create the write stream we have the ability to decide how thick our hose is.
 We can do that by setting the high water mark. In the options right after the file I can send an object of options and I'm going to set 
 the high water mark. Now if I set this to some arbitrary number then we can allow for a larger hose so that's how many bites we'll have in 
 our high water mark or how many bits we'll have. Let's go ahead and try to run this again. So node dot, so because we have a larger hose 
 we don't have as much back pressure. Again if I were to set this very large we won't see any back pressure at all because our internal buffers 
 for the write stream have enough space to handle all of the video. Again without setting this high water mark we don't want to take up too much 
 memory with our application so we can handle that through handling back pressure. That means pausing our read stream until our write stream is 
 ready to handle more data.
 */
