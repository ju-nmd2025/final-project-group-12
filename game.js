import { debugInfo, debugMode }  from "./utils.js";
import { setYPos, platforms, platformsPositionGen, platformsDraw, platformScroll } from "./platforms.js";
import { characterShape, characterCollision, characterMovement, characterDiameter, showStartScreen, showEndScreen, yPos, xPos, ySpeed, xSpeed } from "./character.js";

function setup() {
  // Set up the canvas
  createCanvas(500, 700);
  background(240, 255, 240);
  stroke(0);
  strokeWeight(2);
  frameRate(120);

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

  if (debugMode == true){ // Show debug info if debugMode is true
    debugInfo(ySpeed, xSpeed, xPos, yPos, scrollResult.shift);
  }

  showStartScreen(); // Draw the start screen
  showEndScreen(); // Draw the end screen
}