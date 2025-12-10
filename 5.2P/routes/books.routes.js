const express = require('express');
const router = express.Router();
// Importing the central index file simplifies the path and is cleaner.
const Controllers = require('../controllers'); 
const booksController = Controllers.booksController;

// GET /api/books
router.get('/', booksController.getAllBooks);

// GET /api/books/:id
router.get('/:id', booksController.getBookById);

module.exports = router;