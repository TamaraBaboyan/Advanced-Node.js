const { Readable } = require('stream');

const peaks = [
    "Tallac",
    "Ralston",
    "Rubicon",
    "Twin Peaks",
    "Castle Peak",
    "Rose",
    "Freel Peak"
];

/**
 *  We're going to start with readable streams. Now, a readable stream reads data from a source and then feeds it into a pipeline bit by bit. 
 *  we're gonna create a particular type of stream that can read the data from the array and then pass it along chunk by chunk. 
 */

 class StreamFromArray extends Readable {
     constructor(array) {
         super();
         this.array = array;
         this.index = 0;
     }

/**
 * Whenever we extend the readable stream, we want to implement a read function. So the read function is what happens when this stream reads a chunk of data. 
 */

    _read() {
        if (this.index <= this.array.length) {
            const chunck = this.array[this.index];
            this.push(chunck);
            this.index += 1;
        } else {
            this.push(null);
        }
    }

 }

 const peakStream = new StreamFromArray(peaks);

 peakStream.on('data', (chunk) => console.log(chunk));

 peakStream.on('end', () => console.log('done!'));

 /**
  * So we can see that we're reading our array, bit by bit, and all of these little buffers are the chunks.
  * That means that this stream is operating in binary mode, so it's reading each line of this array, and each chunk is showing us the binary data.
  * Now, streams have two modes, binary mode and object mode, and when they're in binary mode, we can actually read data as binary or we can read it 
  * as a string. So in order to read this data as a string, all we need to do is set the encoding type to UTF-8.
  */

