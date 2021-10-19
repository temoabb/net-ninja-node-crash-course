const fs = require('fs');

const readStreem = fs.createReadStream('./docs/doc3.txt', { encoding: 'utf8' }); // utf8 for character encoding
// First argument: where do we want to read a data from
// Second argument: option object

const writeStream = fs.createWriteStream('./docs/doc4.txt');

// Every time we receive a new chunk of 'data', we fire a callback function
// and there we have access on that chunk of data:

// readStreem.on('data', (chunk) => {
// console.log('------ NEW chunk ------');
// console.log(chunk);
// writeStream.write('\nNEW chunk\n');
// writeStream.write(chunk);
// });

readStreem.pipe(writeStream);