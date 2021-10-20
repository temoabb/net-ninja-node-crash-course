const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req, res) => { // when we send a request on 'localhost:3000', this function will fire every time

  const num = _.random(0, 20);
  console.log(num);

  const greetOnce = _.once(() => console.log('hello'));

  greetOnce();
  greetOnce();


  // set header content type
  // res.setHeader('Content-Type', 'text/plain'); 
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html' // './views/index.html
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html'; // './views/about.html'
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301; // 301 means that resource has moved
      res.setHeader('Location', '/about');
      res.end();
    default:
      path += '404.html'; // './views/404.html'
      res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => { // 'data' is a content of desired file
    // console.log('in readFile');
    if (err) {
      console.log(err); // response is still waiting so we have to end process:
      res.end();
    } else {
      console.log('else');
      // if we are sending one thing, we do not need to write res.write(data). Here we got a single html file and so we can write:
      res.end(data);

      // res.write(data);  
      // res.end();
    }
  });

  // send to the browser
  // res.end();

}); // this is not listening for a request being sent to it yet; for this we have to invoke the 'listen' method: 



const PORT = 3000;
server.listen(PORT, 'localhost', () => {
  console.log(`We are listening our server for a port ${PORT}`) // this function will execute first time 'server.js' file loads
});