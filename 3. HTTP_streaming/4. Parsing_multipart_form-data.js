/**
 * In the last lesson we actually added an upload stream to our http server, so we can actually upload files. And we took our upload
 * request stream and we piped it to several different writable streams. So, in this snippet, we're actually gonna handle parsing the multi-part
 * form data and we're gonna use an npm to do that.
 */

 /**
  * The work to parse multi-part requests has been done many times over and it's been published to many different npms, so there's a lot of 
  * options when it comes to parsing a multi-part form data request. Since we're streaming experts, I've decided to use an npm that also supports
  * streams. 
  */

 const { createServer } = require('http');
 const { stat, createReadStream, createWriteStream } = require('fs');
 const { promisify } = require('util');
 const fileName = '../../powder-day.mp4';
 const fileInfo = promisify(stat);
 const multiparty = require('multiparty');
 
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
          'Accept-Ranges': 'bytes',
          'Content-Length': (end-start) + 1,
          'Content-Type': 'video/mp4'
        })
   
        createReadStream(fileName, { start, end }).pipe(res)
      }
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
         
        /**
         * So if we actually had a form where users were inserting text and filling that out, all of that would come inside of the same request
         * stream and this multiparty will simply parse it off. We only have one value in our form and that's the upload file, so we're gonna go
         * ahead and validate that by listening for a part event. 
         * So I can take that and handle it within this callback function. So when we find a part,
         */
        let form = new multiparty.Form();

        /**
         *  what happens is, as multiparty parses our request, when they find a file or a form field, that's going to be sent as a part.
         */
        form.on('part', (part) => {

            /**
             * the neat thing about multiparty is a part is a readable stream. So when we find a part, what we're actually going to do is
             * just upload it. So I'll take the part and I'll pipe it to a create write stream.
             */
            part.pipe(createWriteStream(`./${part.filename}`))
               .on('close', () => { // once we actually have the upload completed, we're gonna go ahead and listen for an on close event.
                   res.writeHead(200, { 'Content-Type': 'text/html' });
                   res.end(`<h1>File Uploaded: ${part.filename}<h1>`);
               });
        });

        /**
         * now the form will actually parse our multiparty request and it will give us any files that are inside that upload request as parts.
         * It will also give us any form data. So if we actually had a form where users were inserting text and filling that out, all of that
         * would come inside of the same request stream and this multiparty will simply parse it off. 
         * We only have one value in our form and that's the upload file, so we're gonna go ahead and validate that by listening for a part event.
         * (Done above)
         */

        form.parse(req);
     }
 
     else if (req.url === '/video') {
         respondWithVideo(req, res)
     } else {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         res.end(`
             <form enctype="multipart/form-data" method="POST" action="/">
                 <input type="file" name="upload-file" />
                 <button>Upload File</button>
             </form>
         `)
     }
 }).listen(3000, () => console.log('server running - 3000'));


 /**
  * This time when I upload the file I'm actually gonna upload our "Powder Day" video. 
  *  I should be able to open the the newly created file in current. And look at this, it looks like I have a copy of my powder day mp4.
  * Let's see if that's a working copy that was just uploaded. Yes it is.
  * So, it looks like, by using multiparty, to help us parse our multipart requests, we can actually take the part, which represents the file itself,
  * and because that's a readable stream, pipe it to any readable stream that we choose to use.
  * 
  * Final word:
  * So, that actually concludes our little server 
  * project here. So we are successfully able to stream videos to the client on this video server. And handle range requests, as well as handle 
  * upload files. So, we're able to actually stream data from the client. And we can see that we're doing that here with an npm called multiparty.
  */
 