// computerPlay generates a random choice of rock, paper, or scissors.

function computerPlay() {
    let options = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * options.length);
    
    return options[randomIndex];
}

/* 
    playRound takes choices from two players, compares the results, 
    and returns a string with the results.

    Input must be a valid choice (use isValidChoice to validate). 
    Second argument defaults to computer's random choice. 
*/

function playRound(playerSelection, computerSelection = computerPlay()) {
    playerSelection = cleanInput(playerSelection);

    // Generate capitalized versions of selections
    upperPlayerSelection =  playerSelection[0].toUpperCase() + 
                                        playerSelection.substring(1);

    upperComputerSelection =  computerSelection[0].toUpperCase() + 
                                        computerSelection.substring(1);

    // Possible results for player: win, lose, tie. 
    let results = {
        win: `You win! ${upperPlayerSelection} beats ${computerSelection}!`,
        lose: `You lose! ${upperComputerSelection} beats ${playerSelection}!`,
        tie: `You tie! Both selected ${playerSelection}! Try again.`
    }

    // If options are same, return TIE
    if (playerSelection == computerSelection) {
        return results.tie;
    }

    // Check for all winning possibilities. If true, return WIN.
    else if (playerSelection == 'rock' && computerSelection == 'scissors' || 
                    playerSelection == 'paper' && computerSelection == 'rock' || 
                    playerSelection == 'scissors' && computerSelection == 'paper') {      
        return results.win;
    }

    // Else return LOSE
    else return results.lose;
}

// Takes input of any data type and returns lowercase string

function cleanInput(userInput) {
    return (String(userInput)).toLowerCase();
}

/* 
    Checks if provided value (any data type) is a valid option for the game. 
    Returns true if choice is valid; false otherwise.
*/

function isValidChoice(choice) {
    // Array of possible options: rock, paper, scissors
    let options = ["rock", "paper", "scissors"];

    // Convert parameter to lowercase
    choice = cleanInput(choice)

    // Check if parameter is in list of valid options
    result = options.includes(choice);

    return result;
}

/* 
    Gets user input via prompt window. 
    Will continue to re-prompt if invalid value is entered. 
    Will return string of value once valid choice is entered.
*/

function getValidChoice() {
    // No valid choice has been entered yet
    let valid = false;

    // Default prompt message
    let promptMsg = 'Please enter your choice: rock, paper, or scissors.';

    // Keeping trying to get user input until 
    while (!valid) {
        // Ask user for input
        let userChoice = prompt(promptMsg);

        // Convert to lowercase string
        userChoice = cleanInput(userChoice);

        /*  
            Check if choice is valid. 
            If it is, return the value. 
            If it isn't, show error message and try again.
        */

        if (isValidChoice(userChoice)) return userChoice;

        else promptMsg = `"${userChoice}" is not a valid choice. \r\n\r\n` +
                                'Please try again using one of these choices:' +
                                ' rock, paper, or scissors.';
    }  
}

// Plays "Rock, Paper, Scissors" game totalRounds times. 

function game() {
    // Play game totalRounds times
    const totalRounds = 5;

    for (let i = 0; i < totalRounds; i++) {
        // Show current round number
        console.log(`Round ${i + 1} of ${totalRounds}...`);

        // Get player's choice
        let playerChoice = getValidChoice();

        // Check against computer's choice
        let roundResult = playRound(playerChoice);

        // Announce result
        console.log(roundResult);

        // Insert blank line between rounds
        console.log('');
    }
}

// Play game when button is pressed. 
button = document.getElementById('startGame');
window.addEventListener('click', () => {
    game();
}, false);