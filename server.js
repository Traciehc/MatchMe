"use strict";

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

require("dotenv").config(); // Load environment variables
const cors = require("cors");

// CORS setup to allow requests from your front end
const corsOptions = {
    origin: `http://localhost:3000`,
};
app.use(cors(corsOptions));

// Middleware for serving static files and parsing JSON
app.use("", express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Function to fetch 6 random images from Unsplash
async function getImages() {
    const url = `https://api.unsplash.com/photos/random?count=6&client_id=${process.env.CLIENT_ID}`;
    try {
        const response = await fetch(url); // Fetch 6 random images
        const data = await response.json(); // Parse the JSON response
        console.log("Unsplash API Response:", data); // Log the full response for debugging

        // Check if the response is an array (expected when count > 1)
        if (Array.isArray(data)) {
            const images = data.map((photo) => photo.urls.small); // Extract the image URLs
            console.log("Mapped Image URLs:", images); // Log extracted image URLs
            return images; // Return the array of URLs
        } else {
            console.error("Unexpected API response format.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
        return null;
    }
}


// API route to serve the image URLs to the front end
app.get("/api/getImages", async (req, res) => {
    try {
        const returnedImages = await getImages(); // Fetch the images
        if (returnedImages) {
            res.status(200).json({
                status: 200,
                data: returnedImages, // Send the array of image URLs to the front end
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "Failed to fetch images.",
            });
        }
    } catch (error) {
        console.error("Error in API route:", error);
        res.status(500).json({
            status: 500,
            message: "An unexpected error occurred.",
        });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
