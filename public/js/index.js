"use strict";

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let currentRound = 1;
let timerInterval = null;
let timeRemaining = 35; // Set initial timer duration
let roundComplete = false; // Added: Track if the current round was completed successfully

// Function to update the round display
function updateRoundButton() {
    const roundElement = document.getElementById('round');
    roundElement.innerText = `Round: ${currentRound}`;
}

// Function to start the timer for the current round
function startTimer() {
    const timerElement = document.getElementById('timer');
    clearInterval(timerInterval); // Clear any existing timer
    timeRemaining = 35; // Reset the timer for the new round
    timerInterval = setInterval(() => {
        timeRemaining -= 1;
        timerElement.textContent = `Time Remaining: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time\'s up! Click Retry or Next Round.');
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Function to reset game state variables
function resetGameState() {
    firstCard = null;    // Reset first flipped card
    secondCard = null;   // Reset second flipped card
    boardLocked = false; // Unlock the board
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
    roundComplete = false; // Added: Reset round completion flag

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
        });

        setupCardClickHandlers(); // Set up click handlers for cards
    }
    startTimer(); // Start the timer for the current round
}

// Function to flip all cards face down
function flipAllCardsDown() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.classList.remove('flipped', 'matched');
    });
}

// Function to set up card click handlers
function setupCardClickHandlers() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
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
        resetBoard();

        // Check if all cards are matched
        if (document.querySelectorAll('.card.matched').length === 12) {
            stopTimer(); // Stop the timer as all matches are found
            roundComplete = true; // Added: Mark the round as complete
            if (currentRound < 3) {
                alert('All matches made! Click Retry or Next Round.');
            } else {
                alert('You are AWESOME! You made all matches in all 3 rounds!');
            }
        }
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
    if (roundComplete) { // Added: Check if the previous round was successfully completed
        if (currentRound < 3) {
            currentRound++; // Increment the round
            updateRoundButton(); // Update the round display
            flipAllCardsDown(); // Flip all cards face down
            initializeGame(); // Initialize the game for the next round
            roundComplete = false; // Added: Reset the flag for the new round
        } else {
            stopTimer();
            alert('Thanks for playing, you are AWESOME! Keep trying!');
        }
    } else {
        alert('You must complete all matches in this round before proceeding!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initializeGame(); // Start the game
    updateRoundButton(); // Ensure the round display is correct on initial load

    // Add event listeners for retry and next round buttons
    document.querySelector('.retry-button').addEventListener('click', retry);
    document.querySelector('.next-round-button').addEventListener('click', nextRound);
});
