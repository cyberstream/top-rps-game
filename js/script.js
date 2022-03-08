/* global document */

// computerPlay generates a random choice of rock, paper, or scissors.

function computerPlay() {
  const options = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}

// Takes input of any data type and returns lowercase string

function cleanInput(userInput) {
  return (String(userInput)).toLowerCase();
}

/*
    playRound takes choices from two players, compares the results,
    and returns a string with the results.

    Input must be a valid choice (use isValidChoice to validate).
    Second argument defaults to computer's random choice.
*/

function playRound(rawPlayerSelection, computerSelection = computerPlay()) {
  const playerSelection = cleanInput(rawPlayerSelection);

  // Generate capitalized versions of selections
  const upperPlayerSelection = playerSelection[0].toUpperCase()
                                  + playerSelection.substring(1);

  const upperComputerSelection = computerSelection[0].toUpperCase()
                                    + computerSelection.substring(1);

  // Possible results for player: win, lose, tie.
  const results = {
    win: `You win! ${upperPlayerSelection} beats ${computerSelection}!`,
    lose: `You lose! ${upperComputerSelection} beats ${playerSelection}!`,
    tie: `You tie! Both selected ${playerSelection}! Try again.`,
  };

  // If options are same, return TIE
  if (playerSelection === computerSelection) {
    return results.tie;
  }

  if ((playerSelection === 'rock' && computerSelection === 'scissors')
          || (playerSelection === 'paper' && computerSelection === 'rock')
          || (playerSelection === 'scissors' && computerSelection === 'paper')) {
    return results.win;
  }

  return results.lose;
}

/*
    Checks if provided value (any data type) is a valid option for the game.
    Returns true if choice is valid; false otherwise.
*/

function isValidChoice(rawChoice) {
  // Array of possible options: rock, paper, scissors
  const options = ['rock', 'paper', 'scissors'];

  // Convert parameter to lowercase
  const choice = cleanInput(rawChoice);

  // Return boolean for whether parameter is in list of valid options
  return options.includes(choice);
}

/*
    Gets user input via prompt window.
    Will continue to re-prompt if invalid value is entered.
    Will return string of value once valid choice is entered.
*/

function getValidChoice() {
  // No valid choice has been entered yet
  const valid = false;

  // Default prompt message
  let promptMsg = 'Please enter your choice: rock, paper, or scissors.';

  // Keeping trying to get user input until
  while (!valid) {
    // Ask user for input
    let userChoice = window.prompt(promptMsg);

    // Convert to lowercase string
    userChoice = cleanInput(userChoice);

    /*
            Check if choice is valid.
            If it is, return the value.
            If it isn't, show error message and try again.
        */

    if (isValidChoice(userChoice)) return userChoice;

    promptMsg = `"${userChoice}" is not a valid choice. \r\n\r\n`
                                + 'Please try again using one of these choices:'
                                + ' rock, paper, or scissors.';
  }

  return false;
}

// Plays "Rock, Paper, Scissors" game totalRounds times.

function game() {
  // Play game totalRounds times
  const totalRounds = 5;

  for (let i = 0; i < totalRounds; i++) {
    // Show current round number
    console.log(`Round ${i + 1} of ${totalRounds}...`);

    // Get player's choice
    const playerChoice = getValidChoice();

    // Check against computer's choice
    const roundResult = playRound(playerChoice);

    // Announce result
    console.log(roundResult);

    // Insert blank line between rounds
    console.log('');
  }
}

// Play game when button is pressed.
const button = document.getElementById('startGame');
button.addEventListener('click', () => {
  game();
}, false);
