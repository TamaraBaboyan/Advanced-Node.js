/**
 * Returning a result from a function like this is referred to as direct style.
 * Whenever we return a value from a JS function, we are working with code synchronsously using direct style.
 */
function hideString(str) {
    return str.replace(/[a-zA-Z]/g, 'X');
}

var hidden = hideString("Hello World");

console.log( hidden );

console.log("end")