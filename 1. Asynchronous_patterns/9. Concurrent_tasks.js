/**
 * Sometimes your promises may contain large tasks that eat a lot of resources or take a lot of time to process.
 * Running everything at once can be too costly, but running one task at a time may take too long. 
 * A possible solution for this is to create a task queue that can run a specified number of tasks concurrently at the same time.
 */

var delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
});

var tasks = [
  delay(4),
  delay(6),
  delay(4),
  delay(3),
  delay(5),
  delay(7),
  delay(9),
  delay(10),
  delay(3),
  delay(5)
];

/**
 * Here is our promise queue that can run a certain number of promises concurrently. 
 * The only problem is is we can't visualize this queue just yet, so we're gonna actually need to add some more code in order to do that.
 * And we'll do that in the next snippet.
 */

class PromiseQueue {
    constructor(promises=[], concurrentCount=1) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    get runAnother() {
        return (this.running.length < this.concurrent) && this.todo.length;
    }

    run() {
        while(this.runAnother()) {
            var promise = this.todo.shift();
            this.running.push(promise);
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.run();
            });
        }
    }
}


var delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();