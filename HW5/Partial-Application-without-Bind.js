var slice = Array.prototype.slice

function logger(namespace) {
    // SOLUTION GOES HERE

    return function logFn() {
     var args = [].slice.call(arguments)
     args.unshift(namespace)
     return console.log.apply(console, args)
   }
}
    
module.exports = logger


//functional-javascript verify Partial-Application-without-Bind.js