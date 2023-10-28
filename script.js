const textElement = document.getElementById('typewriter-text');
const phases = [
    "It's me hi!",
    "It's me Gidion!",
    "I'm the problem it's me!"
];
let phaseIndex = 0;

function updateText() {
    textElement.textContent = phases[phaseIndex];
    phaseIndex = (phaseIndex + 1) % phases.length;
}

setInterval(updateText, 3000); // Change the text every 3 seconds
updateText(); // Initialize with the first phase

const chatboxContent = document.getElementById("chatbox-content");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to handle user input
function handleUserInput() {
    const expression = userInput.value;
    const response = calculateExpression(expression);
    displayMessage("user", expression);
    displayMessage("bot", response);
    userInput.value = "";
}

// Function to calculate a math expression
function calculateExpression(expression) {
    try {
        const result = eval(expression); // Using eval to evaluate the expression
        return `Result: ${result}`;
    } catch (error) {
        return "Invalid expression";
    }
}

// Function to display messages in the chatbox
function displayMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "sent" : "received");
    messageDiv.textContent = message;
    chatboxContent.appendChild(messageDiv);
}

// Event listener for the send button
sendButton.addEventListener("click", handleUserInput);

// Event listener for the enter key in the input field
userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
});

const albums = document.querySelectorAll('.album');
const audioElements = document.querySelectorAll('.album-audio');

// Function to fade in the audio
function fadeInAudio(audio) {
    let volume = 0.1; // Initial volume
    const fadeInterval = setInterval(() => {
        if (volume < 1) {
            volume += 0.1; // Increase volume gradually
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 100); // Adjust the duration as needed
}

// Function to fade out the audio
function fadeOutAudio(audio) {
    let volume = 1; // Initial volume
    const fadeInterval = setInterval(() => {
        if (volume > 0) {
            volume -= 0.1; // Decrease volume gradually
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
        }
    }, 100); // Adjust the duration as needed
}

// Add event listeners to each album element
albums.forEach((album, index) => {
    album.addEventListener('mouseenter', () => {
        audioElements[index].play();
        fadeInAudio(audioElements[index]);
    });

    album.addEventListener('mouseleave', () => {
        fadeOutAudio(audioElements[index]);
    });
});