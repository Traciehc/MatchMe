Web Development Project: Match Me
Overview
Match Me is my capstone project for CODE:You. It’s a picture matching game designed for both children and adults, providing cognitive benefits such as improved memory, concentration, and problem-solving skills. The game demonstrates key concepts of web development, including the use of:

- HTML, CSS (Grid, Flexbox, Media Queries)

- JavaScript

- Node.js

- Unsplash API

- Express.js

Code Highlight
A rewarding challenge in this project was implementing the card matching logic. Using JavaScript, I created a function to compare selected cards, check for matches, and manage game state. This involved precise handling of array manipulations and API-provided image data.

Features Utilized
Node.js Web Server
- Created with Express.js to serve three HTML files.

Unsplash API Integration
- Fetches images to display as cards in the game. Each session dynamically fetches new images, enhancing replay value.

Data Management
- Arrays and objects are utilized to manage game-related data efficiently.

Tech Stack
-Frontend: HTML, CSS (Grid, Flexbox, Media Queries), JavaScript

- Backend: Node.js, Express.js

- API: Unsplash API

Design Choices
- Color Palette: Bright, playful colors for user engagement.

- Font Stack: Sans-serif fonts for a modern and clear appearance.

- Responsiveness: Ensures compatibility across desktops and mobile devices.

Prerequisites
Ensure Node.js and npm are installed. Visit Node.js to download and set them up.

API Information: Steps to Obtain an API Key
1.  Visit Unsplash API and log in or create an account.

2.  Under "Products," click Developers/API.

3.  Navigate to Your Apps and agree to the API Use and Guidelines.

4.  Provide an app name (e.g., "Match Me") and description ("test") in the application information box, then click Create Application.

5.  Scroll to find your API key and copy it to your clipboard for use in the project.

Setting Up the .env File
1.  Create a .env file in the root directory of the project.

2.  Add this line to the file: CLIENT_ID=paste_or_type_your_api_key_here

Getting Started: Steps to Run the Project Locally
1.  Clone the repository: git clone https://github.com/Traciehc/MatchMe.git

2.  Navigate to the project directory: cd MatchMe

3.  Open the project in your code editor.

4.  Follow the API Information steps to obtain your API key and set up the .env file.

5.  Install required packages: npm i

6.  Run the project: npm run dev

7.  Open your browser and visit http://localhost:3000 to access the Match Me landing page.

8.  Stop the project by pressing Ctrl + C.

> If you're using a code editor other than VS Code, refer to its specific instructions for opening project folders and files.

Future Plans and Reflection
Working on Match Me has been an incredible journey that enhanced my skills in third-party API integration and frontend-backend communication. In the future, I plan to:

Add user authentication for saving player scores.

Implement different difficulty levels by increasing card count.

Enhance design with card flip animations.

This project taught me the value of debugging and breaking complex problems into smaller, manageable pieces, building my confidence in tackling web development challenges.