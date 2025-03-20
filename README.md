Web Development Project Titled Match Me

 Overview

The project is my capstone project for CODE:You. The project is a picture matching game that provides a fun and enjoyable experience for children as well as adults. It is a way to help keep our minds sharp and agile while also improving memory, concentration, and problem-solving skills.The game addresses the need for enjoyable cognitive exercises that can be used by both children and adults to enhance mental acuity in a fun, engaging way.The goal of the project is to demonstrate a general knowledge of HTML, CSS (Grid, Flexbox, Media Queries), JavaScript, Node.js, Unsplash API, Express.js.

Code Highlight
One challenging yet rewarding part of the project was implementing the card matching logic. Using JavaScript, I created a function that compares selected cards and checks for matches while managing the game state. This required careful handling of array manipulations and API-provided image data.

Features Utilized for the project

-Requirement-Create a node.js web server using a modern framework such as Express.js or Fastify.  Serve at least one route that your app uses (must serve more than just the index.html file).
	 - **Node.js Web Server:** Created with Express.js to serve three HTML files.
 -Requirement-Retrieve data from a third-party API and use it to display something within your app.
	 - **Unsplash API Integration:** Fetches images to display as cards in the game, and ensures each game session feels unique by dynamically fetching images for the cards, adding replay value and variety.
Requirement-Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.
 	 - **Data Management:** Uses arrays and objects to manage game-related data.

 Tech Stack
- **Frontend:** HTML, CSS (Grid, Flexbox, Media Queries), JavaScript
- **Backend:** Node.js, Express.js
- **API:** Unsplash API

Design Choices
- **Color Palette:** Bright, playful colors to engage users.
- **Font Stack:** Sans-serif fonts for clarity and modernity.
- **Responsiveness:** Ensures compatibility with desktop and mobile devices.

Prerequisites
- Ensure Node.js and npm are installed. You can download by visiting https://nodejs.org

API Information
-To play MatchMe, you'll need to obtain an API key by visiting https://unsplash.com. Create an account and sign in then go to view more links, under product click on Developers/API.  Click on your apps, this will bring up the API Use and Guidelines.  Place a checkmark in the boxes next to the guidelines and then click accept terms.  An application information box will pop up, type in “Play” or name of your choice for the application name and “test” in the description block then click on create application.  This will bring up an apply for production page.  Scroll down to the middle of the page where your API Key will be shown.  At this point you can copy your API key to your clipboard to be used in the next step.

Set Up the .env File:
-Create a .env file in the root directory of the project.
*Add the following line to the .env file:
CLIENT_ID=paste or type your_api_key_here

Getting Started and Dependencies and Virtual Environment Instructions

To run this project locally, follow these steps:
-Clone the project repository to your local environment:
  	 git clone https://github.com/Traciehc/MatchMe.git 
-Navigate to the project directory:  cd MatchMe
-Open the project in your code editor
-Follow the API Information above to obtain your API Key and set up the .env File.
-Install the packages that are necessary to run the project by navigating to the console and using:
 npm i
**Once the packages are installed you can get it up and running using:
npm run dev
-Open the browser of your choice and navigate to http://localhost:3000, the landing page for About Match Me and Memory games.
 Use Ctrl+ C to stop the project from running

If you are not using VS Code please follow the instructions specific to your code editor for opening project folders and files.

Future Plans and Reflection
Working on Match Me has been an incredible learning experience. I’ve enhanced my skills in integrating third-party APIs and managing frontend-backend communication. Moving forward, I plan to:
- Add user authentication to save player scores.
- Create different difficulty levels by increasing the number of cards.
- Improve the design by incorporating animations for card flips.

A key lesson I’ve learned is the importance of debugging and how to break down complex problems into manageable pieces. This experience has strengthened my confidence in tackling future web development challenges.





