// index.js

"use strict";

const express = require('express');
require('dotenv').config(); // To load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// CORS setup to allow requests from your front end
const corsOptions = {
    origin: `http://localhost:3000`,
};
app.use(cors(corsOptions));

// Middleware to serve static files (if needed)
app.use(express.static('public'));

// Endpoint to get images
app.get('/api/getImages', async (req, res) => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=6&client_id=${process.env.CLIENT_ID}`);
        const data = await response.json();
        const imageUrls = data.map(photo => photo.urls.small); // Extract the small-sized image URLs
        res.json({ data: imageUrls });
    } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

// **New Endpoint** to trigger download (for Unsplash compliance)
app.get('/api/triggerDownload/:photoId', async (req, res) => {
    const { photoId } = req.params;
    const downloadUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${process.env.CLIENT_ID}`;

    try {
        const response = await fetch(downloadUrl);
        const data = await response.json();
        console.log("Download triggered on server:", data);
        res.json({ success: true });
    } catch (error) {
        console.error("Error triggering download on server:", error);
        res.status(500).json({ error: "Failed to trigger download" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
