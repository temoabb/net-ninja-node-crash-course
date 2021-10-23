const express = require('express');

const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_index); // GET all blogs
router.post('/', blogController.blog_create_post); // POST new blog
router.get('/create', blogController.blog_create_get);  // GET blogs/create view (form)
router.get('/:id', blogController.blog_details); // GET single blog
router.delete('/:id', blogController.blog_delete); // DELETE


module.exports = router;