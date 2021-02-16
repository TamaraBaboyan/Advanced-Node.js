/**
 * Let's set up a way to visualize this queue in the console. What I wanna do is install an NPM called log update. 
 */
var logUpdate = require('log-update');
var toX = () => 'X';

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

    graphTasks() {
        var { todo, running, complete } = this;
        logUpdate(`
        
        todo: [${todo.map(toX)}]
        running: [${running.map(toX)}]
        complete: [${complete.map(toX)}]

        `)
    }

    run() {
        while(this.runAnother) {
            var promise = this.todo.shift();
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.graphTasks();
                this.run();
            });
            this.running.push(promise);
            this.graphTasks()

        }
    }
}


var delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();