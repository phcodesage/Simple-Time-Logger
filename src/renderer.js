const { clipboard } = require('electron');
const moment = require('moment-timezone');

// Reference to the input fields and buttons
const timeInDisplay = document.getElementById('time-in');
const timeOutDisplay = document.getElementById('time-out');
const logTimeInButton = document.getElementById('log-time-in');
const logTimeOutButton = document.getElementById('log-time-out');

// Function to get the current date and time in Manila time zone
function getCurrentDateTime() {
    const now = moment().tz("Asia/Manila");
    const formattedDateTime = now.format("YYYY-MM-DD HH:mm:ss");
    return formattedDateTime;
}

// Function to log time in
function logTimeIn() {
    const timeIn = getCurrentDateTime();
    timeInDisplay.value = `Time In: ${timeIn}`;
    clipboard.writeText(timeIn);
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
}

// Add event listeners to buttons
logTimeInButton.addEventListener('click', logTimeIn);
logTimeOutButton.addEventListener('click', logTimeOut);
