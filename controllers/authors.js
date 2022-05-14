const express = require('express');
const Author = require('../models/author');

const controller = express.Router();

// All Authors
controller.get('/', async (req, res) => {
  const searchOptions = {};
  if (req.query.name !== null && req.query.name !== '') {
    // set reg expression to case insensitive
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

// New Author
controller.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Create new Author
controller.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //   res.redirect(`authors/${newAuthor.id`)
    res.redirect(`/authors`);
  } catch {
    res.render('authors/new', {
      author,
      errorMessage: 'Error creating Author',
    });
  }
});

module.exports = controller;
