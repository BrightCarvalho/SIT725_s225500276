// server.js  (place in project root)

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Movie data
const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    imageUrl: "/css/interstellar.jpeg",
    description: "A team of explorers travel through a wormhole in space to secure humanity's survival."
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    rating: 8.1,
    imageUrl: "/css/Mad_Max_Fury_Road.jpg",
    description: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee a tyrant."
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    imageUrl: "/css/shawshank_redemption.jpeg",
    description: "Two imprisoned men bond over years, finding solace and eventual redemption."
  },
  {
    id: 4,
    title: "The Conjuring",
    year: 2013,
    genre: "Horror",
    rating: 7.5,
    imageUrl: "/css/the_conjuring.jpg",
    description: "Paranormal investigators help a family terrorized by a dark presence in their farmhouse."
  }
];

// GET /api/movies
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});