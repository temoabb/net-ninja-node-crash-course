const express = require('express');
const PORT = 3000;

// #### express app
const app = express(); // <- it returns a function
app.listen(PORT, () => console.log(`We are listening our server for a port:${PORT}`));


// #### register view engine
app.set('view engine', 'ejs');  // set() lets us configure some application settings; Now it knows that ejs is going to be used to create our templates;
// We need a place to create our different ejs views



// #### listen for requests

// WHen we send a request in the browser, if we type something and press enter, express is going to tun through this code TOP to BOTTOM to look at each of these get handlers (/, /about, /about-us). 
// If it finds a match, if the URL user has requested is matched any of these: /, /about, /about-us, then express fires callback function. 
// And if it matches and if inside we SEND A RESPONSE TO THE BROWSER, then express no longer carries on down the rest of the code.

// send() method Automatically infers content-type and status code, so we don't need these anymore:  

// res.setHeader('Content-Type', 'text/html');
// res.statusCode = 200;

app.get('/', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname }); // C:\work\net-ninja-node
  res.render('index');
})

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname }) // C:\work\net-ninja-node
  res.render('about')
})


app.get('/blogs/create', (req, res) => {
  res.render('create');
})


// #### redirects
// app.get('/about-us', (req, res) => {
//   // res.redirect('/about'); // automatically sets the status code
//   res.render('about');
// })


// 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404');
})

// This MUST be at the BOTTOM of the file, becasue:
// use function is going to fire for every single request coming in but only if the request reaches this point in the code. i.e. none of above path matches user's entered path