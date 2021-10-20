const fs = require('fs'); // fs stands for file system

// read files
fs.readFile('./docs/doc2.text', (err, data) => { // asynchronous
  if (err) console.log(err);
  else console.log('data in file ->', data.toString());
})


// console.log('First log ->>');


// writing files
// Why did execute writeFile() first?

fs.writeFile('./docs/doc1.text', 'Replace everything with this text in doc1.text file', () => {
  console.log('file was rewriten');
});



// directories
// if (!fs.existsSync('./assets')) {
//   fs.mkdir('./assets', (err) => {
//     if (err) console.log(err);
//     console.log('Folder has created!')
//   })
// } else {
//   fs.rmdir('./assets', (err) => {
//     if (err) console.log(err);
//     console.log('Folder deleted! Happy coding!')
//   })
// }


// deleting files

if (fs.existsSync('./docs/doc1.text')) {
  fs.unlink('./docs/doc1.text', (err) => {
    if (err) console.log(err)
    console.log('File deleted!')
  })
} else console.log('No such file: /docs/doc1.text')
