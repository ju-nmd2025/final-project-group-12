import { 
  debugInfo, 
  debugMode, 
  changeHighScoreColor, 
  randomFromRange 
} from "./utils.js";

import {
  setYPos,
  platforms,
  platformsPositionGen,
  platformsDraw,
  platformScroll,
  score,
  shift,
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
  highScore,
} from "./character.js";

let backgroundImg;
let treesImg;
let treeYPos = -700;
let currentTreeIndex = 0;
let treeScale = 1;

let backgroundScroll = [0, -700];
let treesScroll = 0;

function preload() {
  preloadCharacter();
  backgroundImg = loadImage("img/bg.png");
  treesImg = [
    loadImage("img/trees/tree_1.png"), 
    loadImage("img/trees/tree_2.png"), 
    loadImage("img/trees/tree_3.png"), 
    loadImage("img/trees/tree_4.png")];
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

export function resetBG() {
  treeYPos = -700;
  backgroundScroll = [0, -700];
  treesScroll = 0;
}

function drawBackground() {
  imageMode(CORNER);
  backgroundScroll[0] += Math.round(shift / 3);
  backgroundScroll[1] += Math.round(shift / 3);
  push();
  noStroke();
  if (backgroundScroll[0] >= height) {
    backgroundScroll[0] = backgroundScroll[1] - height;
  }
  if (backgroundScroll[1] >= height) {
    backgroundScroll[1] = backgroundScroll[0] - height;
  }
  image(backgroundImg, 0, backgroundScroll[0], width, height + 1);
  image(backgroundImg, 0, backgroundScroll[1], width, height + 1);
  pop();
}

function TreesDraw() {
  push();
  imageMode(CORNER);
  tint(255, 240);
  drawingContext.filter = "blur(10px)";
  treesScroll += shift * 1.5;
  treeYPos = treesScroll - 700;

  translate(width / 2, treeYPos);
  scale(treeScale, 1);
  image(treesImg[currentTreeIndex], -350, 0, 700, 700); // Use currentTreeIndex to select a random tree
  if (treeYPos >= height) {
    treesScroll = 0;
    treeYPos = -700;
    treeScale = Math.random() > 0.5 ? 1 : -1;
    currentTreeIndex = Math.floor(Math.random() * treesImg.length); // Randomly pick an index for the next tree
  }
  pop();
}

function draw() {
  drawBackground();

  characterMovement(); // Update character movement

  platformsDraw(platforms); // Draw platforms and check for collisions

  // Handle platform scrolling
  const scrollResult = platformScroll(platforms, yPos); // Creates a variable scrollResult that returns newYPos and shift (see the funnction in platforms.js)
  setYPos(scrollResult.newYPos); // Extracts the newYPos variable from the platformScroll function and sends it to the platfroms.js through the setYPos to update the yPos value there

  characterCollision(platforms); // Check for collision

  characterShape(xPos, yPos, characterDiameter); //Draw the character

  TreesDraw();

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
  push();
  fill(changeHighScoreColor(score, highScore));
  strokeWeight(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("HIGH SCORE: ", 75, 20); // Display high score
  text(highScore, 75, 40);
  pop();
  showStartScreen(); // Draw the start screen
  showEndScreen(); // Draw the end screen
  if (frameRate() < 45) {
    console.log("Low FPS detected: " + Math.round(frameRate()));
  }
}

// Make setup(), draw(), and mouseClicked() globally available so p5.js can find them
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
