/**
 * Let's introduce some asyncronicity into our hideString function.
 * process.nextTick() tells nodejs to invoke the function that we we send to nextTick on the next loop. So it won't happen synchronously.
 * We did not want the log hidden until we get a result from the hide string method.
 * Our code no longer executes the order that appears on the page. It executes when it is ready.
 */

function hideString(str, done) {
    process.nextTick(() => {
      done(str.replace(/[a-zA-Z]/g, 'X'));  
    })
    
}

var hidden = hideString("Hello World", (hidden) => {
    console.log(hidden);
});

console.log( "end" );
