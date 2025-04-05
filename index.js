

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function throttle(func, interval) {
    let lastExecuted = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastExecuted >= interval) {
            func(...args);
            lastExecuted = now;
        }
    };
}


const args = process.argv.slice(2);
const type = args[0];               
const message = args[1];            
const delay = parseInt(args[2]);    

if (!type || !message || isNaN(delay)) {
    console.log("Usage:");
    console.log('  node index.js debounce "Message" 1000');
    console.log('  node index.js throttle "Message" 1000');
    process.exit(1);
}

if (type === "debounce") {
    const debouncedFn = debounce((msg) => {
        console.log(`Debounced: ${msg}`);
    }, 1000); // Fixed internal delay

    setTimeout(() => {
        debouncedFn(message);
    }, delay);
}

else if (type === "throttle") {
    const throttledFn = throttle((msg) => {
        console.log(`Throttled: ${msg}`);
    }, 1000); // Fixed internal interval

    setTimeout(() => {
        throttledFn(message);
    }, delay);
}

else {
    console.log("Invalid type. Use 'debounce' or 'throttle'.");
}
