// Toggles the debug information and end screen display (so you don't die when you fall, but bounce off instead)
let debugMode = true;

// Function to generate a random number within a specified range
function randomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to display debug information on the screen
function debugInfo(ySpeed, xSpeed, xPos, yPos, shift) {
  push();
  strokeWeight(0);
  fill(0);
  text("Gravity: " + Math.round(ySpeed), 10, 20);
  text("X Speed: " + xSpeed.toFixed(2), 10, 40);
  text("X Pos: " + xPos.toFixed(2), 10, 60);
  text("Y Pos: " + yPos.toFixed(2), 10, 80);
  text("Shift: " + shift.toFixed(2), 10, 100);
  pop();
}