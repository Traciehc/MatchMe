// index.js

"use strict";

let firstCard = null;    // First card flipped
let secondCard = null;   // Second card flipped
let boardLocked = false;

// Variable to store the current round
let currentRound = 1; // Start at Round 1

// Function to update the round display
function updateRoundButton() {
    const roundElement = document.getElementById('round');
    roundElement.innerText = `Round: ${currentRound}`; // Dynamically update round text
}

// Function to fetch images from the server
async function getImages() {
    try {
        const response = await fetch("/api/getImages");
        const data = await response.json();
        console.log("Fetched images (Front End):", data.data);
        return data.data; // Return the array of image URLs (6 URLs)
    } catch (error) {
        console.error("Error fetching images from server:", error);
        return null;
    }
}

// Function to trigger download event for a photo
async function triggerDownload(photoId) {
    try {
        const response = await fetch(`/api/triggerDownload/${photoId}`);
        const data = await response.json();
        console.log("Download triggered:", data);
    } catch (error) {
        console.error("Error triggering download:", error);
    }
}

// Function to handle the usage of a photo
function usePhoto(photoUrl) {
    const photoId = new URL(photoUrl).pathname.split('/').pop(); // Extract the photo ID
    triggerDownload(photoId); // Trigger Unsplash download without awaiting
    console.log(`Photo used: ${photoUrl}`);
}

// Function to duplicate and shuffle images
function duplicateAndShuffleImages(images) {
    const allImages = [...images, ...images]; // Duplicate for 12 cards
    for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]]; // Shuffle the array
    }
    return allImages;
}

// Function to initialize the game
async function initializeGame() {
    resetGameState(); // Reset variables
    flipAllCardsDown(); // Flip all cards face down

    const images = await getImages(); // Fetch 6 images from the server
    if (images) {
        const shuffledImages = duplicateAndShuffleImages(images); // Duplicate and shuffle for 12 cards
        const cards = document.querySelectorAll('.card');

        // Assign images to the cards
        cards.forEach((card, index) => {
            card.dataset.image = shuffledImages[index];

            const img = document.createElement('img');
            img.src = shuffledImages[index];
            img.alt = 'Game card displaying a random image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            card.innerHTML = ''; // Clear the card content
            card.appendChild(img); // Add the image element

            console.log(`Card ${index} assigned image:`, shuffledImages[index]);
        });

        console.log("Shuffled Images Array:", shuffledImages);

        setupCardClickHandlers();
    }
}

// Function to flip all cards face down
function flipAllCardsDown() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.classList.remove('flipped', 'matched');
    });
}

// Function to reset game state variables
function resetGameState() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

// Function to set up click handlers for cards
function setupCardClickHandlers() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        // Remove existing event listener to prevent duplicates
        card.removeEventListener('click', handleCardClick);
        // Add the event listener
        card.addEventListener('click', handleCardClick);
    });
}

// Event handler for card clicks
async function handleCardClick() {
    if (boardLocked) return; // Do nothing if the board is locked
    if (this === firstCard) return; // Ignore if the same card is clicked

    this.classList.add('flipped');
    const imgSrc = this.getAttribute('data-image');

    if (firstCard === null) {
        firstCard = this; // Store the first card
    } else {
        secondCard = this; // Store the second card
        boardLocked = true; // Lock the board while checking for a match
        await checkForMatch(firstCard, secondCard);
    }
}

// Function to check for matching cards
async function checkForMatch(firstCard, secondCard) {
    const firstImage = firstCard.getAttribute('data-image');
    const secondImage = secondCard.getAttribute('data-image');

    if (firstImage === secondImage) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        usePhoto(firstImage); // Trigger Unsplash download
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

// Function to reset the board state
function resetBoard() {
    firstCard = null;
    secondCard = null;
    boardLocked = false; // Unlock the board
}

// Function to retry the game
function retry() {
    location.reload(); // Reload the page
}

// Function to start the next round
function nextRound() {
    if (currentRound < 3) { // Check if the current round is less than 3
        currentRound++; // Increment the round
        updateRoundButton(); // Update the round display

        // Flip all cards face down at the start of the new round
        flipAllCardsDown();

        // Initialize the game with new images
        initializeGame();
    } else {
        alert('You have completed all 3 rounds! You are AWESOME!'); // Notify the player
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initializeGame();
    updateRoundButton(); // Ensure the round display is correct on initial load

    let timeRemaining = 35; // Set the timer duration
    const timerElement = document.getElementById('timer');

    const countdown = setInterval(() => {
        timeRemaining -= 1;
        timerElement.textContent = `Time Remaining: ${timeRemaining}`;

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            alert('Time\'s up! Click Retry or Next Round.');
        }
    }, 1000);

    document.querySelector('.retry-button').addEventListener('click', retry);
    document.querySelector('.next-round-button').addEventListener('click', nextRound);
});

