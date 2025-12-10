const Book = require('../models/bookModel');

// Service function to get all books from MongoDB
async function getAllBooks() {
    // Performs the MongoDB query and returns plain objects
    return await Book.find({});
}

// Service function to get a book by its ID from MongoDB
async function getBookById(id) {
    // Finds the book by matching the provided ID
    return await Book.findOne({ id: id });
}

module.exports = {
    getAllBooks,
    getBookById
};