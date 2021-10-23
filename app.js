const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express(); // <- it returns a function

const blogRoutes = require('./routes/blogRoutes');

app.set('view engine', 'ejs'); // register view engine

// middleware & static files
app.use(express.static('public')); // users have access to the files in 'public' folder (images, text files etc.)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


// listen requests
app.get('/', (req, res) => {
  res.redirect('/blogs');
})

// GET about view
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})


// blog routes
app.use('/blogs', blogRoutes);

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