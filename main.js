import { debugInfo }  from "./utils.js";
import { setYPos, platforms, platformsPositionGen, platformShape, platformsDraw, platformScroll } from "./platforms.js";
import { jumper, CharacterCollision, CharacterMovement } from "./character.js";

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
  CharacterMovement();
  // Show debug information
  debugInfo(ySpeed, xSpeed, xPos, yPos);
  // Draw platforms and check for collisions
  platformsDraw(platforms);

  // Vertical Screen Scrolling Logic
  const newYPos = platformScroll(platforms, yPos);
  setYPos(newYPos);

  CharacterCollision(platforms);
  // Draw the jumper
  jumper(xPos, yPos, 75);
}