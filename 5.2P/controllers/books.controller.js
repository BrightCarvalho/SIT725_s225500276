const booksService = require('../services/books.service');

function getAllBooks(req, res) {
    try {
        const books = booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error("Error fetching all books:", error);
        res.status(500).json({ error: "Failed to retrieve books." });
    }
}

function getBookById(req, res) {
    try {
        const { id } = req.params;
        const book = booksService.getBookById(id);

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

module.exports = {
    getAllBooks,
    getBookById
};