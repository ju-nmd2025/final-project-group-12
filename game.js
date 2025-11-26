import { jumper } from "./character.js";
import { CharacterCollision } from "./character.js";
import { CharacterMovement } from "./character.js";

let xPos = 100; // Initial horizontal position
let yPos = 400; // Initial vertical position
let ySpeed = 1; // Initial vertical speed
let jumperDiameter = 75; // Diameter of the character

let gravityAcceleration = 0.9; // Gravity effect
let xSpeed = 0; // Current horizontal speed
let xAcceleration = 1.2; // How fast the character speeds up horizontally
let xFriction = 0.9; // Friction to slow down horizontal movement after key release

let platforms = []; // An empty list to start

function randomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function setup() {
  createCanvas(500, 700);
  background(240, 255, 240);
  stroke(0);
  strokeWeight(2);
  frameRate(120);

  platforms.push({ x: randomFromRange(50, 400), y: 400 });
  platforms.push({ x: randomFromRange(50, 400), y: 200 });
  platforms.push({ x: randomFromRange(50, 400), y: 600 });
  platforms.push({ x: randomFromRange(50, 400), y: 500 });
  platforms.push({ x: randomFromRange(50, 400), y: 100 });
}

// Function to draw a platform
function platform(x, y, diameter) {
  fill(150, 75, 0);
  rect(x, y, 100, diameter);
}

// Function to display debug information
function debugInfo(ySpeed, xSpeed, xPos, yPos) {
  push();
  strokeWeight(0);
  fill(0);
  text("Gravity: " + Math.round(ySpeed), 10, 20);
  text("X Speed: " + xSpeed.toFixed(2), 10, 40);
  text("X Pos: " + xPos.toFixed(2), 10, 60);
  text("Y Pos: " + yPos.toFixed(2), 10, 80);
  pop();
}

// Function that show the end screen and pauses the game
function showEndScreen() {
  //CHANGE TO TRUE TO TURN OFF GAME OVER
  let turnOffGameOver = false;

  if (turnOffGameOver === false) {
    //Stop player movement and hide the player
    jumperDiameter = 0;
    ySpeed = 0;
    gravityAcceleration = 0;
    xAcceleration = 0;
    xFriction = 0;
    //Show the end screen
    push();
    fill("black");
    quad(0, 0, 500, 0, 500, 700, 0, 700);
    pop();
    push();
    fill("red");
    textStyle(BOLD);
    textSize(50);
    textAlign(CENTER);
    text("YOU ARE DEAD!", 500 / 2, 100);
    pop();
  }
}

function draw() {
  // Clear the background each frame
  background(240, 255, 240);

  // Update character movement
  CharacterMovement();

  // Show the debug information
  debugInfo(ySpeed, xSpeed, xPos, yPos);

  // Draw platforms and check for collisions
  for (let p of platforms) {
    platform(p.x, p.y, 20);
    CharacterCollision(p.x, p.y);
  }

  // Vertical Screen Scrolling Logic
  if (yPos < 200) {
    let shift = 200 - yPos;

    yPos = 200;

    for (let p of platforms) {
      p.y += shift;
      if (p.y >= height) {
        p.y = 0;
        p.x = randomFromRange(50, 400);
      }
    }
  }

  // Checks if the player is triggering the end screen by falling down beneath the canvas(TODO)
  if (yPos >= 650) {
    showEndScreen();
  }

  // Draw the jumper
  jumper(xPos, yPos, jumperDiameter);
}
