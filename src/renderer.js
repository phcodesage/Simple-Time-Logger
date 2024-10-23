const { clipboard } = require('electron');
const moment = require('moment-timezone');

// Reference to the input fields and buttons
const timeInDisplay = document.getElementById('time-in');
const timeOutDisplay = document.getElementById('time-out');
const logTimeInButton = document.getElementById('log-time-in');
const logTimeOutButton = document.getElementById('log-time-out');
const timerDisplay = document.getElementById('timer-display');

// Load alarm sound
const alarmSound = new Audio('src/alarm.mp3');

// Disable the Log Out button until logged in
logTimeOutButton.disabled = true;

// Function to get the current date and time in Manila time zone
function getCurrentDateTime() {
    const now = moment().tz("Asia/Manila");
    const formattedDateTime = now.format("YYYY-MM-DD HH:mm:ss");
    return formattedDateTime;
}

// Function to show notification and reset timer
function showNotification() {
    new Notification("Stand Up Reminder", {
        body: "It's been 30 minutes! Time to stand up and stretch.",
    });

    // Play alarm sound
    alarmSound.play();

    // Animate the timer display
    timerDisplay.classList.add('pulse');

    // Show a prompt to reset the timer
    setTimeout(() => {
        if (confirm("Stand up and stretch! Press OK to reset the timer.")) {
            resetTimer();
        }
    }, 100); // Slight delay to allow notification to be visible
}

// Timer variables and function for 30-minute countdown
let timer;
let countdown;
function startTimer() {
    clearTimeout(timer); // Clear any existing timer

    // Set countdown for 30 minutes (1800 seconds)
    let remainingTime = 30 * 60; // Change to 30 * 60 for production

    // Update the timer display every second
    countdown = setInterval(() => {
        remainingTime--;

        // Convert seconds to minutes and seconds (MM:SS)
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `Stand Up Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // When the timer reaches 0, show the notification and stop the countdown
        if (remainingTime <= 0) {
            clearInterval(countdown);
            showNotification();
        }
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    timerDisplay.classList.remove('pulse');
    timerDisplay.textContent = 'Stand Up Timer: 30:00';
    startTimer();
}

// Function to log time in
function logTimeIn() {
    const timeIn = getCurrentDateTime();
    timeInDisplay.value = `Time In: ${timeIn}`;
    clipboard.writeText(timeIn);

    // Enable Log Out button and start the timer
    logTimeOutButton.disabled = false;
    startTimer();
}

// Function to log time out
function logTimeOut() {
    const timeOut = getCurrentDateTime();
    timeOutDisplay.value = `Time Out: ${timeOut}`;
    clipboard.writeText(timeOut);

    // Prompt for tasks done
    const tasks = prompt('What tasks did you complete?');
    if (tasks !== null && tasks.trim() !== '') {
        console.log(`Tasks completed: ${tasks}`);
    }

    // Disable Log Out button, clear the timer, and reset the display
    logTimeOutButton.disabled = true;
    clearInterval(countdown);
    timerDisplay.textContent = 'Stand Up Timer: 30:00';
    timerDisplay.classList.remove('pulse');
}

// Add event listeners to buttons
logTimeInButton.addEventListener('click', logTimeIn);
logTimeOutButton.addEventListener('click', logTimeOut);

// Dark-themed styling
document.body.style.backgroundColor = '#1e1e2f';
document.body.style.color = '#c7c7c7';
document.body.style.fontFamily = 'Arial, sans-serif';

const buttons = [logTimeInButton, logTimeOutButton];
buttons.forEach(button => {
    button.style.backgroundColor = '#3a3a5a';
    button.style.color = '#ffffff';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
});

const inputs = [timeInDisplay, timeOutDisplay];
inputs.forEach(input => {
    input.style.backgroundColor = '#2e2e3e';
    input.style.color = '#ffffff';
    input.style.border = '1px solid #3a3a5a';
    input.style.padding = '10px';
    input.style.margin = '5px';
    input.style.borderRadius = '5px';
    input.style.width = '300px';
});

// Style for the timer display
timerDisplay.style.fontSize = '18px';
timerDisplay.style.margin = '10px';
timerDisplay.style.textAlign = 'center';
