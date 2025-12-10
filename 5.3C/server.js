// server.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Import router file
const booksRouter = require('./routes/books.routes');

// Import the full controller object, which contains all our route handlers.
// Since you are likely using controllers/index.js, we stick to the simpler
// direct file import for maximum compatibility, assuming booksController
// exports the functions (which it does).
const booksController = require('./controllers/books.controller'); 

const app = express();
const PORT = 3000;

// Hardcoded MongoDB URI 
const MONGO_URI = 'mongodb://localhost:27017/sit725_book_catalog'; 

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connection successful.'))
    .catch(err => console.error('MongoDB connection error. Is the server running on 27017?', err.message));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the integrity check route
// Line 25: Now uses the correctly defined and imported booksController object.
app.get('/api/integrity-check42', booksController.integrityCheck); 

// Mount the books API routes under the /api/books base path
app.use('/api/books', booksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Access the client at: http://localhost:${PORT}/index.html`);
});