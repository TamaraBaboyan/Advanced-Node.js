/**
 * The HTTP response object is a writable stream and the HTTP request object is a readable stream. We can use the request stream as a source. 
 * In this snippet our server's gonna handle multiple requests 
 */

const { createServer } = require('http');
const { stat, createReadStream, createWriteStream } = require('fs');
const { promisify } = require('util');
const fileName = '../../powder-day.mp4';
const fileInfo = promisify(stat);

const respondWithVideo = async (req, res) => {
    const { size } = await fileInfo(fileName);
    const range = req.headers.range;
    console.log(`range: ${range}`);
  
     if (range) {
       let [start, end] = range.replace(/bytes=/, '').split('-');
  
       start = parseInt(start, 10);
       end = end ? parseInt(end, 10) : size - 1;
  
       res.writeHead(206, {
         'Content-Range': `bytes ${start}-${end}/${size}`,
         'Accept-Ranges': 'bytes', // I'm also gonna add an Accept-Range as header
         'Content-Length': (end-start) + 1,
         'Content-Type': 'video/mp4'
       })
  
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
  
  }

createServer((req, res) => {
    if (req.method === 'POST') {
        /**  as we know, the request is a readable stream, which means we can pipe that to a writeable stream.
         * So we'll just see the contents of our uploaded file. But we can also fork our streams. All we need to do is call request pipe and we can 
         * pipe it to other places as well. Why don't we try to send this to the response and process.standard output, another writeable stream.
         * In fact, I can go ahead and send this to a file, too. So we'll create a third WriteStream, and this WriteStream will write our upload.file.
         */
        req.pipe(res); // stream the request to the response
        req.pipe(process.stdout); // print the contents of the file to standard output
        req.pipe(createWriteStream('./upload.file'));   // write the request to the a new file
    }

    else if (req.url === '/video') {
        respondWithVideo(req, res)
    } else { // we will display a form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        /**
         *  we set enctype to multipart form data. And that means when we respond with this form our data will be encoded as multipart form data 
        which is required in order to upload files.
         */ 
        res.end(`
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="upload-file" />
                <button>Upload File</button>
            </form>
        `)
    }
}).listen(3000, () => console.log('server running - 3000'));

/**
 *  So we did three things with one request stream, simply by piping that request stream to different writeStreams.
 * 
 * Now one of the reasons that we're uploading the file first, as opposed to the video, is to see a problem that we have to deal with.
 * 
 * So whenever we have multipart form data what actually happens is our response streams the file that we uploaded, so the contents of whatever
 * the file is, be that a text file or a binary file, it gets streamed as text and then these form boundaries. So we see this WebKitFormBoundary.
 * That gives us information about the file. We can see the file name there and the content type of the file, so on and so forth. 
 * So we actually have to parse this response. And instead of doing the heavy lifting of doing that, in the next snippet we're gonna look at 
 * an MPM that will help us parse these form data responses.
 * 
 * Note: this code can't upload mp4 file to server
 */
