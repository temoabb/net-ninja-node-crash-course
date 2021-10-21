const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// models
const Blog = require('./models/blog');

const app = express(); // <- it returns a function


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')); // users have access to the files in 'public' folder (images, text files etc.)

// console.log
app.use(morgan('dev'));


// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => { // this is asynchrnous task. Takes some time

  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog.save() // saving to collection; it returns us a promise
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
})

// listen requests
app.get('/', (req, res) => {
  const blogs = [
    { title: 'Max Verstappen', snippet: 'lorem ipsum dolor sit amet' },
    { title: 'Lewis Hamilton', snippet: 'lorem ipsum dolor sit amet' },
    { title: 'Valteri Bottas', snippet: 'lorem ipsum dolor sit amet' },
  ];
  res.render('index', { title: 'Home', blogs: blogs });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
})

app.use((req, res) => { // 404 page
  res.status(404).render('404', { title: '404' });
})

// This MUST be at the BOTTOM of the file, becasue:
// use function is going to fire for every single request coming in but only if the request reaches this point in the code. i.e. none of above path matches user's entered path

const databaseURI = 'mongodb+srv://temoabb:GitGit123@cluster0.zo1tg.mongodb.net/node-ninja?retryWrites=true&w=majority';
const PORT = 3000;

// mongoose is going to go out and connect to this database for us
mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => console.log(`We are listening our server for a port:${PORT}`)))
  .catch(error => console.log(error)); // this is asyncdhorous task

// QUICK NOTE: mongoose is third party pakage. So, we have to install it: npm install mongoose





// Function that runs after request is received and before response is sent, we call middleware:  req > middleware > res. These are all middlewares:

// set() lets us configure some application settings; Now it knows that ejs is going to be used to create our templates. We need a place to create our different ejs views

// When we send a request in the browser, if we type something and press enter, express is going to tun through this code TOP to BOTTOM to look at each of these get handlers (/, /about, /about-us)

// If it finds a match, if the URL user has requested is matched any of these: /, /about, /about-us, then express fires callback function. 
// And if it matches and if inside we SEND A RESPONSE TO THE BROWSER, then express no longer carries on DOWN THE REST OF THE CODE.


// send() method Automatically infers content-type and status code, so we don't need these anymore:  
// res.setHeader('Content-Type', 'text/html');   res.statusCode = 200;


// res.sendFile('./views/about.html', { root: __dirname }) // C:\work\net-ninja-node
// res.status(404).sendFile('./views/404.html', { root: __dirname });
// res.sendFile('./views/index.html', { root: __dirname }); // C:\work\net-ninja-node



// #### redirects
// app.get('/about-us', (req, res) => {
//   // res.redirect('/about'); // automatically sets the status code
//   res.render('about');
// })