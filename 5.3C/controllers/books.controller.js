const booksService = require('../services/books.service');

// Handles GET /api/books
async function getAllBooks(req, res) {
    try {
        // Call the async Service
        const books = await booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        // Use next(error) for centralized error handling if implemented, 
        // but for minimal example, we keep simple status 500
        console.error("Error fetching all books:", error);
        res.status(500).json({ error: "Failed to retrieve books." });
    }
}

// Handles GET /api/books/:id
async function getBookById(req, res) {
    try {
        const { id } = req.params;
        // Call the async Service
        const book = await booksService.getBookById(id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: `Book with ID ${id} not found.` });
        }
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ error: "Failed to retrieve book." });
    }
}

// Handles GET /api/integrity-check42
function integrityCheck(req, res) {
    // Return 204 No Content as required
    res.status(204).send();
}

module.exports = {
    getAllBooks,
    getBookById,
    integrityCheck
};