const mongoose = require('mongoose');
// The updated model export pattern handles model loading errors
const Book = require('../models/bookModel'); 

// Hardcoded MongoDB URI (must match server.js)
const MONGO_URI = 'mongodb://localhost:27017/sit725_book_catalog'; 

// Data with price as strings (Mongoose converts these to Decimal128 automatically)
const bookData = [
    {
        id: 'b1',
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        year: 2008,
        genre: 'Science Fiction',
        summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy...",
        price: '24.99' 
    },
    {
        id: 'b2',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        genre: 'Classic',
        summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall...",
        price: '18.50'
    },
    {
        id: 'b3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Classic',
        summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations...",
        price: '15.90'
    },
    {
        id: 'b4',
        title: 'The English Patient',
        author: 'Michael Ondaatje',
        year: 1992,
        genre: 'Historical Fiction',
        summary: "In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts...",
        price: '29.99'
    },
    {
        id: 'b5',
        title: 'Small Gods',
        author: 'Terry Pratchett',
        year: 1992,
        genre: 'Fantasy',
        summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire...",
        price: '22.00'
    }
];

async function seedDB() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        
        if (mongoose.connection.readyState !== 1) {
            throw new Error("MongoDB connection failed to establish.");
        }

        // The Model should now be correctly retrieved due to the update in bookModel.js
        await Book.deleteMany({});
        console.log('Existing books cleared.');

        await Book.insertMany(bookData);
        console.log(`${bookData.length} books successfully seeded.`);

    } catch (err) {
        // Explicitly check for the Model not found error if it still occurs
        if (err.message.includes("Model not found") || err.name === 'TypeError') {
             console.error("\n*** FATAL ERROR: MODEL LOADING ISSUE ***");
             console.error("The 'Book' Model object is not correctly recognized. Please verify the following:");
             console.error("1. The path '../models/bookModel' in seed.js is correct.");
             console.error("2. You have installed Mongoose (npm install mongoose).\n");
        }
        console.error('Error details:', err);

    } finally {
        if (mongoose.connection.readyState !== 0) {
            console.log('Closing MongoDB connection.');
            await mongoose.connection.close();
        }
    }
}

seedDB();