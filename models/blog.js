const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2 steps: 

// a) make a schema (which defines a structure)
// b) create a model based on that schema



// REMEMBER: Schema is going to define a STRUCTURE of our documents.

// new Schema() is going to create a new instance of Schema object.

// We need to pass in an object as a parameter. 
// This object will define a structure of the documents, that we want to store in our 'blogs' collection in 'node-ninja' database ultimately


const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true // it automatically creates timestamp properties for us
  }
)

const Blog = mongoose.model('Blog', blogSchema); // IMPORTANT: why did we name it 'Blog'?

// In database (node-ninja) we've got a collection 'blogs'. 

// As a first argument we write 'Blog'. It is going to pluralize it ('Blog' -> 'blogs') and look for that collection INSIDE THE DATABASE whenever we use this model in the future TO COMMUNICATE with database;

// QUICK NOTE: 'Blog' is a model name.

// second argument: what type of objects are we going to store inside this collection

module.exports = Blog;

// REMEMBER: Schema is going to define a STRUCTURE of our documents, that we are going to store later inside a collection;
// REMEMBR: 'model' is a thing that surrounds that and provides us an iterface by wchich to COMUNICATE with a DATABASE COLLECTION for that document type;