const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express(); // <- it returns a function

app.set('view engine', 'ejs'); // register view engine
const Blog = require('./models/blog');
const { response } = require('express');


// middleware & static files
app.use(express.static('public')); // users have access to the files in 'public' folder (images, text files etc.)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


// listen requests
app.get('/', (req, res) => {
  res.redirect('/blogs');
})


// GET all blogs
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      // console.log('all blogs in \'blogs\' collection', typeof result, result);
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch(err => console.log(err))
})


// POST new blog
app.post('/blogs', (req, res) => {
  const { title, snippet, body } = req.body;
  const blog = new Blog({
    title,
    snippet,
    body
  })

  blog.save()
    .then(result => res.redirect('/blogs'))
    .catch(err => console.log(err))
})

// GET about view
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// GET add-blog view
app.get('/add-blog', (req, res) => { // this is asynchrnous task. Takes some time
  const blog = new Blog({ // this is an instance of 'Blog'
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog.save() // saving to collection; it returns us a promise, save() is an instance method; 'blog' is instance itself
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
})

// GET single blog
app.get('/blogs/:id', (req, res) => {
  // we write here 'req.params.id' because handler is '/blogs/:id'; If handler were '/blogs/:nuts' we would write: 'req.params.nuts' 
  const id = req.params.id;
  Blog.findById(id)
    .then(response => res.render('details', { blog: response, title: 'Blog details' }))
    .catch(err => res.render('404', { title: 'Couldn\'\t find user!' }))
})


app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => console.log(err));
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