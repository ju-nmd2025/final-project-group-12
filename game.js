import { 
  debugInfo, 
  debugMode,
} from "./utils.js";

import {
  setYPos,
  platforms,
  platformsPositionGen,
  platformsDraw,
  platformScroll,
  score,
} from "./platforms.js";

import {
  characterShape,
  characterCollision,
  characterMovement,
  characterDiameter,
  showStartScreen,
  showEndScreen,
  yPos,
  xPos,
  ySpeed,
  xSpeed,
  mouseClicked,
  preloadCharacter,
  ballMovement,
} from "./character.js";

let ball;

function preload() {
  preloadCharacter();
}

function setup() {
  // Set up the canvas
  createCanvas(500, 700);
  background(240, 255, 240);
  stroke(0);
  strokeWeight(2);
  frameRate(60);

  // Initialize platforms
  platforms.push(...platformsPositionGen());
}

function draw() {
  background(240, 255, 240); // Clear the background each frame

  characterMovement(); // Update character movement

  platformsDraw(platforms); // Draw platforms and check for collisions

  // Handle platform scrolling
  const scrollResult = platformScroll(platforms, yPos); // Creates a variable scrollResult that returns newYPos and shift (see the funnction in platforms.js)
  setYPos(scrollResult.newYPos); // Extracts the newYPos variable from the platformScroll function and sends it to the platfroms.js through the setYPos to update the yPos value there

  characterCollision(platforms); // Check for collision

  characterShape(xPos, yPos, characterDiameter); //Draw the character

  if (debugMode == true) {
    // Show debug info if debugMode is true
    debugInfo(ySpeed, xSpeed, xPos, yPos, scrollResult.shift, ballMovement);
  }
  push();
  fill(0);
  strokeWeight(0);
  textSize(20);
  textAlign(RIGHT, TOP);
  text("Score: ", 495, 20); // Display score
  text(score, 490, 40);
  pop();
  showStartScreen(); // Draw the start screen
  showEndScreen(); // Draw the end screen
}

// Make setup(), draw(), and mouseClicked() globally available so p5.js can find them
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
