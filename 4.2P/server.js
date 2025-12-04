// server.js (MODIFIED to use Mongoose)

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// --- MONGODB CONNECTION ---
// IMPORTANT: Change this connection string if your MongoDB setup is different
const DB_URI = "mongodb://localhost:27017/cinemascopeDB"; 

mongoose.connect(DB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    // ⚠️ Optional: Run the seed function to populate the database on startup
    // Comment out 'seedMovies()' after the first run if you want the data to persist
    seedMovies(); 
    
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// --- MOVIE SCHEMA & MODEL ---
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  // The frontend filtering logic handles this as a comma-separated string,
  // but we store it as an array to be flexible.
  genre: [String], 
  rating: Number,
  imageUrl: String,
  description: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// --- SEED FUNCTION (Populates the DB) ---
async function seedMovies() {
  const initialMovies = [
    {
      title: "Interstellar",
      year: 2014,
      genre: ["Sci-Fi", "Adventure"],
      rating: 8.6,
      imageUrl: "/css/interstellar.jpeg",
      description: "A team of explorers travel through a wormhole in space to secure humanity's survival."
    },
    {
      title: "Mad Max: Fury Road",
      year: 2015,
      genre: ["Action"],
      rating: 8.1,
      imageUrl: "/css/Mad_Max_Fury_Road.jpg",
      description: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee a tyrant."
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genre: ["Drama"],
      rating: 9.3,
      imageUrl: "/css/shawshank_redemption.jpeg",
      description: "Two imprisoned men bond over years, finding solace and eventual redemption."
    },
    {
      title: "The Conjuring",
      year: 2013,
      genre: ["Horror"],
      rating: 7.5,
      imageUrl: "/css/the_conjuring.jpg",
      description: "Paranormal investigators help a family terrorized by a dark presence in their farmhouse."
    }
  ];

  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      const result = await Movie.insertMany(initialMovies);
      console.log(`Seeding complete: ${result.length} sample movies inserted.`);
    } else {
      console.log(`Database already contains ${count} movies. Seeding skipped.`);
    }
  } catch (err) {
    console.error("Error during seeding process:", err);
  }
}

// --- EXPRESS ROUTES ---

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// GET /api/movies (Fetches from DB)
app.get("/api/movies", async (req, res) => {
  try {
    // Finds all documents in the 'movies' collection
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies from DB:", error);
    res.status(500).json({ message: "Failed to retrieve movies." });
  }
});

// GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Note: Server listening moved inside mongoose.connect success handler