const mongoose = require('mongoose');

// Schema defines shape and types.
const bookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    price: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true,
        // Getter converts Decimal128 to a standard string for JSON output
        get: (v) => v != null ? v.toString() : null
    }
}, {
    // Allows the use of getters
    toJSON: { getters: true }, 
    id: false 
});

// Use Mongoose's built-in check: If the Model is already compiled, use it. 
// Otherwise, compile and use the new one. This prevents conflicts across files.
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;