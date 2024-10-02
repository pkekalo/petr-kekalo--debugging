// Grabbing necessary DOM elements
const guessInput = document.getElementById('guess'); // User input field for guessing the number
const submitButton = document.getElementById('submit'); // Button to submit the guess
const resetButton = document.getElementById('reset'); // Button to reset the game
const messages = document.getElementsByClassName('message'); // All messages for feedback
const tooHighMessage = document.getElementById('too-high'); // Message when guess is too high
const tooLowMessage = document.getElementById('too-low'); // Message when guess is too low
const maxGuessesMessage = document.getElementById('max-guesses'); // Message when max guesses are reached
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); // Message showing remaining guesses
const correctMessage = document.getElementById('correct'); // Message when user guesses the correct number

let targetNumber; // This will hold the randomly generated number for the user to guess
let attempts = 0; // Counter for the number of attempts the user has made
const maxNumberOfAttempts = 5; // Maximum allowed number of guesses

// Function to generate a random number between min and max (inclusive of min, exclusive of max)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // Generates the random number
}

// Function that gets called when the user submits a guess
function checkGuess() {
  const guess = parseInt(guessInput.value, 10); // Convert user input to a number
  attempts = attempts + 1; // Increment the attempt count

  hideAllMessages(); // Hide all messages before showing the relevant one

  if (guess === targetNumber) { // If user guessed the correct number
    numberOfGuessesMessage.style.display = ''; 
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`; // Show how many attempts were made

    correctMessage.style.display = ''; // Show the success message

    submitButton.disabled = true; // Disable submit button once the correct number is guessed
    guessInput.disabled = true; // Disable input field after correct guess
  }

  if (guess !== targetNumber) { // If the guess is incorrect
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // Show the "too low" message
    } else {
      tooHighMessage.style.display = ''; // *** bug fixed: was showing 'tooLowMessage', now shows correct 'tooHighMessage'
    }

    const remainingAttempts = maxNumberOfAttempts - attempts; // Calculate remaining guesses

    numberOfGuessesMessage.style.display = ''; 
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`; // Display remaining guesses
  }

  if (attempts === maxNumberOfAttempts) { // If maximum number of attempts reached
    submitButton.disabled = true; // Disable submit button
    guessInput.disabled = true; // Disable input field
  }

  guessInput.value = ''; // Clear input field after each guess
  resetButton.style.display = ''; // Show the reset button so user can restart the game
}

// Function to hide all message elements
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // Loop through all message elements
    messages[elementIndex].style.display = 'none'; // Hide each message
  }
}

// Function to set up the game or reset it
function setup() {
  targetNumber = getRandomNumber(1, 100); // Generate a new random number for the new game
  console.log(`target number: ${targetNumber}`); // Log the target number for debugging purposes

  attempts = 0; // Reset the attempt counter *** bug fixed: was 'maxNumberOfAttempts = 0', now correctly resets 'attempts'

  submitButton.disabled = false; // Enable the submit button for new guesses *** bug fixed: was 'disabeld', now it is 'disabled'
  guessInput.disabled = false; // Enable the input field for new guesses

  hideAllMessages(); // Hide all previous messages
  resetButton.style.display = 'none'; // Hide the reset button until the game ends
}

// Add event listeners to the buttons
submitButton.addEventListener('click', checkGuess); // Call 'checkGuess' function when the submit button is clicked
resetButton.addEventListener('click', setup); // Call 'setup' function to reset the game when reset button is clicked

// Initialize the game
setup(); // Start the game when the page loads