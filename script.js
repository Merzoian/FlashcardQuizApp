//************************************************** */
//This file where all the app logic happens it handles:
//loading Flashcards
// Displaying Cards
// Adding New Cards
// Deleting Cards
// Navifation controls 
// Saving and Syncing
// I think of it as the brain of the app 
//*********************************************** */
// Load flashcards from localStorage or set to empty array if none exist
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// Keeps track of which card is currently shown
let currentIndex = 0;

// Tracks if the card is currently flipped to show the answer
let isFlipped = false;

// Get references to HTML elements
const cardFront = document.getElementById("card-front");      // Question side
const cardBack = document.getElementById("card-back");        // Answer side
const flashcardContainer = document.getElementById("flashcard"); // The flashcard box itself
const form = document.getElementById("flashcard-form");       // The add-card form

// Flip card when the flashcard container is clicked
flashcardContainer.addEventListener("click", () => {
  isFlipped = !isFlipped;  // Toggle flip state
  flashcardContainer.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
});

// Show the current flashcard (based on currentIndex)
function displayCard() {
  if (flashcards.length === 0) {
    // If there are no cards, display message
    cardFront.textContent = "No flashcards available.";
    cardBack.textContent = "";
    return;
  }

  const card = flashcards[currentIndex]; // Get the card at currentIndex
  cardFront.textContent = card.question; // Show question
  cardBack.textContent = card.answer;    // Show answer (on flip)
  isFlipped = false;                     // Reset flip state
  flashcardContainer.style.transform = "rotateY(0deg)"; // Show front
}

// Move to next card
function nextCard() {
  if (flashcards.length > 0) {
    currentIndex = (currentIndex + 1) % flashcards.length; // Loop back to start
    displayCard(); // Update display
  }
}

// Move to previous card
function prevCard() {
  if (flashcards.length > 0) {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length; // Loop to end if needed
    displayCard(); // Update display
  }
}

// Add a new flashcard when the form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get input values
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer").value.trim();

  if (question && answer) {
    // Create new flashcard and add to array
    flashcards.push({ question, answer });

    // Save to localStorage
    localStorage.setItem("flashcards", JSON.stringify(flashcards));

    // Clear form inputs
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";

    // Show the new card
    currentIndex = flashcards.length - 1;
    displayCard();
  }
});

// Delete the current flashcard
function deleteCard() {
  if (flashcards.length === 0) return;

  // Remove current card from array
  flashcards.splice(currentIndex, 1);

  // Adjust currentIndex if needed
  if (currentIndex >= flashcards.length) {
    currentIndex = flashcards.length - 1;
  }

  // Save updated array to localStorage
  localStorage.setItem("flashcards", JSON.stringify(flashcards));

  // Show the updated card (or message if empty)
  displayCard();
}

// Initialize app by showing the first card
displayCard();







