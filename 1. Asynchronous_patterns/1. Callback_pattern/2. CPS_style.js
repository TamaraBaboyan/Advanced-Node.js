/**
 * Well, direct style is not only way to return values from functions.
 * Here we modified the hideString function to pass its value back using something called "continuation passing style" or CPS.
 * a Callback needs to be asynchronous. This code is still operating synchronously. Meaning that the entire thread has executed in order.
 * 
 * Callback pattern: 
 * A callback is a block of instruction wrapped in a function to be called when an  asynchronous call has completed.
 */

function hideString(str, done) {
    done(str.replace(/[a-zA-Z]/g, 'X'));
}

var hidden = hideString("Hello World", (hidden) => {
    console.log(hidden)
});

console.log("end")