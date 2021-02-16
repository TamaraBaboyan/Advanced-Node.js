/**
 * A promise is an object that can be used to represent the eventual completion of an a asynchronous operation.
 * 
 * Let's create the exact same function using a promise.
 * This is a basic introduction to promises. They give us a nice way to handle what happens when a promise succeeds, using a chain of "then" functions.
 *
 */

var delay = (seconds) => new Promise((resolves, rejects) => {
    setTimeout(() => {
        resolves('the long delay has ended')
    }, seconds * 1000);
});

delay(1)
  .then(console.log)
  .then(() => 42)
  .then((number) => console.log(`Hello world: ${number}`))

console.log('end first tick');
