// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';

// Parse the JSON data into an array of objects
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Function to delete all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Get the element with the id "games-container"
const gamesContainer = document.getElementById("games-container");

// Function to add game data as cards to the games-container
function addGamesToPage(games, filterCondition = () => true) {
    // Get the element with the id "games-container"
    const gamesContainer = document.getElementById("games-container");

    // Filter the games based on the provided condition
    const filteredGames = games.filter(filterCondition);

    // Loop over each item in the filtered games array
    for (let i = 0; i < filteredGames.length; i++) {
        // Create a new div element for each game, representing a game card
        const gameCard = document.createElement("div");

        // Add the class "game-card" to each game card
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display information about each game
        gameCard.innerHTML = `
            <img src="${filteredGames[i].img}" alt="${filteredGames[i].name}" class="game-img" />
            <h2>${filteredGames[i].name}</h2>
            <p>${filteredGames[i].description}</p>
            <p>Backers: ${filteredGames[i].backers.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Initial call to addGamesToPage with the entire games array
addGamesToPage(GAMES_JSON);

// Function to show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Call the function to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// Function to show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Call the function to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// Function to show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Call the function to add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// Get elements for displaying summary statistics
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Calculate and display total contributions
const totalContributions = GAMES_JSON.reduce((accumulator, game) => accumulator + game.backers, 0);
contributionsCard.innerHTML = `<p>Total Contributions: ${totalContributions.toLocaleString()}</p>`;

// Calculate and display total amount raised
const totalRaised = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);
raisedCard.innerHTML = `<p>Total Raised: $${totalRaised.toLocaleString()}</p>`;

// Display total number of games
gamesCard.innerHTML = `<p>Total Games: ${GAMES_JSON.length}</p>`;

// Get buttons for filtering games
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to buttons for filtering games
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Use filter to get a list of games that have not yet met their goal
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

// Get the number of unfunded games
const numUnfundedGames = unfundedGames.length;

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Get the description container
const descriptionContainer = document.getElementById("description-container");

// Construct the display string using a template literal and ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${numUnfundedGames} game${numUnfundedGames !== 1 ? 's' : ''} remain${numUnfundedGames !== 1 ? '' : 's'} unfunded. We need your help to fund these amazing games!`;

// Create a new paragraph element
const displayParagraph = document.createElement("p");

// Set the inner HTML of the paragraph element
displayParagraph.innerHTML = displayStr;

// Append the paragraph element to the descriptionContainer
descriptionContainer.appendChild(displayParagraph);

// Sort the games based on the amount pledged in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructuring and using the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Get elements for displaying the top 2 games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Create a new element for the top funded game and append it to the correct element
const firstGameElement = document.createElement("div");
firstGameElement.innerHTML = `<h3>${firstGame.name}</h3>`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second most funded game and append it to the correct element
const secondGameElement = document.createElement("div");
secondGameElement.innerHTML = `<h3>${secondGame.name}</h3>`;
secondGameContainer.appendChild(secondGameElement);
