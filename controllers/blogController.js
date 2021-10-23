const Blog = require('../models/blog');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete


const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    // console.log('all blogs in \'blogs\' collection', typeof result, result);
    .then(blogs => res.render('blogs/index', { title: 'All Blogs', blogs }))
    .catch(err => console.log(err))
}

const blog_details = (req, res) => {
  const id = req.params.id; // We'll write here 'req.params.id' because handler is '/blogs/:id'; If handler were '/blogs/:nuts' we would write: 'req.params.nuts'
  Blog.findById(id)
    .then(result => res.render('blogs/details', { blog: result, title: 'Single blog details' }))
    .catch(err => res.render('404', { title: 'Oops! Couldn\'\t find blog! ' }))
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save(blog)
    .then(response => res.redirect('/blogs'))
    .catch(err => console.log(err))
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(response => res.json({ redirect: '/blogs' }))
    .catch(err => console.log(err));
}


module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
}