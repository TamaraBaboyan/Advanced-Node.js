/**
 * node JS streams are everywhere. And the idea is that you wanna stream everything. 
 * So let's go ahead and get started building an HTTP server that can stream a video to the web browser. 
 */
const { createServer } = require('http');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util');

const fileName = '../../powder-day.mp4';
const fileInfo = promisify(stat);

createServer(async(req, res) => {
    /**
     * What we wanna do is add a subtle improvement. We should tell the web browser how long the video is, and we can do that through the headers. 
     */
    const { size } = await fileInfo(fileName)

    /**
     * we need to do is take the response, and tell it in the header that we have a successful response by setting a status code of 200,
     * and that our content type is a video. An MP4 video. So that will tell the browser to use the correct video component to handle the stream 
     * that coming from local host 3000
     */
    
    res.writeHead(200, {
        'Cotent-Length': size,
        'Content-Type': 'video/mp4',
     });
    createReadStream(fileName).pipe(res);
}).listen(3000, () => console.log('server - 3000'));

/**
 * Now we're displaying this using the HTML five video component. The browser knows to use that because any requests to local host 3000 returns
 * an MP4 video. But the problem is, something else out here on this play head, a future point in this video, it doesn't handle that.
 * So these are called range requests. And what we need to do is make our video respond to range requests. This is very important because if 
 * I actually go over here into Safari, and go into local host 3000, we don't see a video at all. And the reason is that Safari requires that 
 * we handle these range requests. So in the next snippet, we're gonna go ahead and handle the range requests to make our video respond for 
 * requests of shorter clips or a future clip.
 */
