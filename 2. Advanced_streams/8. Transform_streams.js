/**
  In the last snippet, I mentioned transform streams. Transform streams are a special type of duplex stream.
  Instead of simply passing the data to the read in to the write in, transform streams change the data. 

  Transform streams are the center pipe pieces that can be used to transform data from readable streams before they are sent to writable streams.

 */

const { Transform } = require('stream');

class ReplaceText extends Transform {

    constructor(char) {
        super();
        this.replaceCar = char;

    }

    /** we have a chunk of data coming into the transform method and we're changing it, before we push it out of this stream.  */
    _transform(chunck, encoding, callback) {
       const transformChunk = chunck.toString()
            .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceCar);
       this.push(transformChunk);
       callback();

   }

   _flush(callback) {
       this.push('more stuff is being passed...');
       callback();
   }

}

/** so from standard input through the xStream transform stream
 * all I can see is, are X's. So you can see that only the characters or digits are being replaced.
 */
var xStream = new ReplaceText('X');

process.stdin
   .pipe(xStream)
   .pipe(process.stdout);

/**
*  Node.js comes with a zlib package, that's a transform stream that can be used to zip incoming data from the read stream,
* and send compressed data to the write stream. Crypto is an NPM package that has transform streams that can encrypt data chunk by chunk,
* and then pass encrypted data to the write stream, or decrypt data from a read stream, and pass the decrypted data to the write stream.
* So transform streams are an essential part of the stream family.
*/
