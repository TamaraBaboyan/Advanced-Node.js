function delay(seconds, callback) {
    setTimeout(callback, seconds*1000);
}

/**
 * Now we can sequentially execute delays using callbacks. 
 * This code is an example of sequential execution with callbacks.
 * However we create some pretty nasty looking code as well as a specific anti pattern called callback hell or pyramid of doom.
 * In the next lessons we will examine some techniques for dealing with callback hell.
 */

console.log('starting delays');
delay(2, () => {
    console.log('two seconds');
    delay(1, () => {
        console.log('three seconds');
        delay(1, () => {
            console.log('four seconds');
        })
    })
})

