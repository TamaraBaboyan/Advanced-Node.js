const { createWriteStream } = require('fs');

const writeStream = createWriteStream('./file.txt');

process.stdin.pipe(writeStream);

/**
 
 I'm also gonna change the write stream to write to something called file.txt, so we're gonna write to a text file. 
 And where should we get the data from? Well let's use process.stdin, so a standard input can pipe, remember, any read stream can pipe to any write 
 stream. So now, we're gonna go ahead and pipe data from standard input to a text file. So let me come over here to the terminal, 
 and I will type node dot, and I don't see anything happen right away, but if I type hello world, this data is actually being piped to a text file.
 Command + backslash will open up my menu here, and I can see there's a file.txt. So the write stream's still open, 
 because process standard input is still open. That means I can pipe more text into, whoops, this writable. Pretty cool.
  
 */


/**
 
 $ echo "Hello World" | node 2. pipe_from_console_to_file.js

 so I'm gonna go ahead and instead of creating my text file from typing data directly into standard input, 
 I'm gonna go ahead and do is use a Unix pipe to actually pipe the data. So within my terminal, I can type echo hello world.
 So instead of repeating it back to us, what I wanna do is, I wanna take this data and send it into my program. And I can do so with a Unix pipe.
 And now I can say node dot, and what happens is, our program starts and finishes, and what we've done is, we've actually just piped that 
 hello world directly into the file. 




$ cat ../sample.txt| node 2. pipe_from_console_to_file.js 

So something else that I can do is, instead of echoing the text to get it into the file using the Unix pipe, I can also just copy a file.
So I'll go ahead and cat the sample.txt file. And I can go ahead and pipe that into my program with a Unix pipe, using standard input.
And when I run that, we can take a look at our file text, and you will notice that it has copied all of the text from the sample.txt 
file into our file.txt. 

So the pipe function allows us to pipe data from any readable stream to any writable stream.

 */