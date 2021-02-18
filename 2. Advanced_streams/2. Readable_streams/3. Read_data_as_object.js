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
         super({ objectMode: true });
         this.array = array;
         this.index = 0;
     }

/**
 * Whenever we extend the readable stream, we want to implement a read function. So the read function is what happens when this stream reads a chunk of data. 
 */

    _read() {
        if (this.index <= this.array.length) {
            const chunck = {
                data: this.array[this.index],
                index: this.index
            }
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
  *  Now, there is one other type of mode, and that's object mode. So we can pass binary data through a read stream,
  * we can also pass string data by sending the encoding type, and I can also specify whether the object mode of our readable stream is on.
  */

