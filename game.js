import { debugInfo }  from "./utils.js";
import { setYPos, platforms, platformsPositionGen, platformsDraw, platformScroll } from "./platforms.js";
import { characterShape, characterCollision, characterMovement, characterDiameter, showEndScreen, yPos, xPos, ySpeed, xSpeed } from "./character.js";

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
  // Clear the background each frame
  background(240, 255, 240);
  // Update character movement
  characterMovement();
  // Show debug information
  const scrollResult = platformScroll(platforms, yPos);
  debugInfo(ySpeed, xSpeed, xPos, yPos, scrollResult.shift);
  // Draw platforms and check for collisions
  platformsDraw(platforms);

  // Vertical Screen Scrolling Logic
  
  setYPos(scrollResult.newYPos);

  characterCollision(platforms);
  // Draw the jumper
  characterShape(xPos, yPos, characterDiameter);
  showEndScreen();
}