/**
 * So far, we've made a small HTTP server that can stream an MP4 video to the browser. But our streams only work in Firefox and Chrome.
 * They don't work in Safari and we can't skip ahead. We cannot request the different range. For our video to work in Safari, we have to implement 
 * range requests. And this will also allow us to skip ahead to different starting points using the HTML5 video player.
 */

const { createServer } = require('http');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util');
const fileName = '../../powder-day.mp4';
const fileInfo = promisify(stat);

createServer(async (req, res) => {
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;
  console.log(`range: ${range}`);

  /**
   * So if we have a range, we will handle the range request. 
   * Otherwise we're just gonna go ahead and send the video back.
   */

   if (range) {
     let [start, end] = range.replace(/bytes=/, '').split('-');

     /** I wanna make sure that these values are integers because it starts out as a string */
     start = parseInt(start, 10);
     end = end ? parseInt(end, 10) : size - 1;

  /**
   * we do writeHead this time, we will do 206. And what 206 means is partial content. So we're gonna be streaming a part of the video,
   * not a full video, so that will let the browser know that we are handling this range request.
   * 
   */
     res.writeHead(206, {
       'Content-Range': `bytes ${start}-${end}/${size}`,
       'Accept-Ranges': 'bytes', // I'm also gonna add an Accept-Range as header
       'Content-Length': (end-start) + 1,
       'Content-Type': 'video/mp4'
     })


   /**
    * we're not gonna create a stream for the full video. When I create this ReadStream, I'm gonna send some additional options.
    * So the second argument that I can add here are additional options and they include a start and end values. So I can create a ReadStream 
    * that only streams part of the file, starting at the start point and ending at the requested end point. So this will actually handle our 
    * range request. All I need to do is now pipe this to our response and we should be good to go. 
    */
     createReadStream(fileName, { start, end }).pipe(res)
   } 
  //  if we don't have a range request, we'll just go ahead and send the full video back
   else {
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'video/mp4'
      });
      createReadStream(fileName).pipe(res);
   }

}).listen(3000, () => console.log('server running - 3000'));

/**
 * So here's our video. And can I skip ahead? Yes, I can skip to different points of the video. So we are handling range requests.
 * And we can also go ahead and give this a test out on Safari. Does this work in Safari now? Going to localhost:3000.
 * Yes, it does. So Safari requires that we handle these range requests and because we are, our video now works. So now, our video handles 
 * range requests and we also introduced some stream options that we can add to file streams, specifically setting up a smaller piece of the stream 
 * using start and end values. So now, we've streamed video content to the browser. In the next two lessons, we're gonna go ahead and stream content 
 * from the browser.
 */
