const express = require('express');
const path = require('path');
const booksRouter = require('./routes/books.routes');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the books API routes under the /api/books base path
app.use('/api/books', booksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Access the client at: http://localhost:${PORT}/index.html`);
});