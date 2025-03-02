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
        const response = await fetch("http://localhost:3000/api/getImages");
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
    const downloadUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${process.env.CLIENT_ID}`;
    try {
        const response = await fetch(downloadUrl);
        const data = await response.json();
        console.log("Download triggered:", data);
    } catch (error) {
        console.error("Error triggering download:", error);
    }
}

// Function to handle the usage of a photo
async function usePhoto(photoUrl) {
    const photoId = new URL(photoUrl).pathname.split('/').pop(); // Extract the photo ID
    await triggerDownload(photoId); // Trigger download for Unsplash compliance
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

function setupCardClickHandlers() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', async () => {
            if (boardLocked) return; // Do nothing if the board is locked
            if (card === firstCard) return; // Ignore if the same card is clicked

            card.classList.add('flipped');
            const imgSrc = card.getAttribute('data-image');

            if (firstCard === null) {
                firstCard = card; // Store the first card
            } else {
                secondCard = card; // Store the second card
                boardLocked = true; // Lock the board while checking for a match
                await checkForMatch(firstCard, secondCard);
            }
        });
    });
}

// Function to check for matching cards
async function checkForMatch(firstCard, secondCard) {
    const firstImage = firstCard.getAttribute('data-image');
    const secondImage = secondCard.getAttribute('data-image');

    if (firstImage === secondImage) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        await usePhoto(firstImage); // Trigger Unsplash download
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
        initializeGame(); // Reinitialize the game with new images
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
            alert('Time\'s up! Game over.');
        }
    }, 1000);

    document.querySelector('.retry-button').addEventListener('click', retry);
    document.querySelector('.next-round-button').addEventListener('click', nextRound);
});
