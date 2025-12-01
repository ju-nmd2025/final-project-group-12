import { isCameraScrolled } from "./platforms.js";

let xPos = 100; // Initial horizontal position
let yPos = 400; // Initial vertical position
let ySpeed = 1; // Initial vertical speed
let xSpeed = 0; // Current horizontal speed
let characterDiameter = 75;
let xAcceleration = 1.2; // How fast the character speeds up horizontally
let xFriction = 0.9; // Friction to slow down horizontal movement after key release
let gravityAcceleration = 0.9; // Gravity effect
let startScreenVisible = true; // Stop player movement and show start screen

function characterShape(x, y, diameter) {
  fill(100, 150, 255);
  circle(x, y, diameter);
  fill(255);
}

class button {
  xPos;
  yPos;
  ySize;
  xCalculatePosetive;
  xCalculateNegative;
  yCalculatePosetive;
  yCalculateNegative;
  color;
  text;
  visible = false;

  constructor(xPos, yPos, xSize, ySize, color, text) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ySize = ySize;
    this.xCalculatePosetive = xPos + xSize / 2;
    this.xCalculateNegative = xPos - xSize / 2;
    this.yCalculatePosetive = yPos + ySize / 2;
    this.yCalculateNegative = yPos - ySize / 2;
    this.color = color;
    this.text = text;
  }

  draw() {
    push();
    fill(this.color);
    quad(
      this.xCalculateNegative,
      this.yCalculateNegative,
      this.xCalculatePosetive,
      this.yCalculateNegative,
      this.xCalculatePosetive,
      this.yCalculatePosetive,
      this.xCalculateNegative,
      this.yCalculatePosetive
    );
    pop();
    push();
    fill("white");
    textStyle(BOLD);
    textSize(this.ySize - 10);
    textAlign(CENTER, CENTER);
    text(this.text, this.xPos, this.yPos);
    pop();
    // Tell the button that it is visible
    this.visible = true;
  }
}

// Buttons
const startButton = new button(250, 350, 250, 100, "blue", "Start");
const retryButton = new button(250, 350, 200, 50, "green", "Retry");

function restart() {
  startScreenVisible = false;
  startButton.visible = false;
  retryButton.visible = false;
  isCameraScrolled = false;
  xPos = 100;
  yPos = 400;
  ySpeed = 1;
  xSpeed = 0;
}

function mouseClicked() {
  //Retry button
  if (
    mouseX >= retryButton.xCalculateNegative &&
    mouseX <= retryButton.xCalculatePosetive &&
    mouseY >= retryButton.yCalculateNegative &&
    mouseY <= retryButton.yCalculatePosetive &&
    retryButton.visible === true
  ) {
    restart();
  } else if (
    mouseX >= startButton.xCalculateNegative &&
    mouseX <= startButton.xCalculatePosetive &&
    mouseY >= startButton.yCalculateNegative &&
    mouseY <= startButton.yCalculatePosetive &&
    startButton.visible === true
  ) {
    restart();
  }
}

function showStartScreen() {
  if (startScreenVisible === true) {
    push();
    fill("white");
    quad(0, 0, 500, 0, 500, 700, 0, 700);
    pop();
    push();
    fill("black");
    textStyle(BOLD);
    textSize(50);
    textAlign(CENTER);
    text("Game Title", 500 / 2, 100);
    pop();
    startButton.draw();
  }
}

function showEndScreen() {
  // If the player have made the camera scroll the player can trigger a game over
  if (yPos + characterDiameter / 2 > height && isCameraScrolled === true) {
    let turnOffGameOver = false;

    if (turnOffGameOver === false) {
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
      retryButton.draw();
    }
  }
}

function characterCollision(platforms) {
  // Ground Collision Logic
  if (yPos + characterDiameter / 2 > height && isCameraScrolled === false) {
    ySpeed = -25;
    yPos = height - characterDiameter / 2;
  }

  // Platform Collision Logic
  for (let p of platforms) {
    // Remove platform() drawing call — already drawn in drawPlatforms()
    let ballBottom = yPos + characterDiameter / 2;

    if (ySpeed > 0) {
      if (xPos > p.x && xPos < p.x + 100) {
        if (ballBottom >= p.y && ballBottom <= p.y + 25) {
          ySpeed = -25;
          yPos = p.y - characterDiameter / 2;
        }
      }
    }
  }
}

function characterMovement() {
  // Dont move the player when start screen is visible
  if (startScreenVisible === true) {
    xPos = 100;
    yPos = 200;
  } else {
    ySpeed += gravityAcceleration; // Apply gravity
    yPos += ySpeed; // Update vertical position
  }

  // --- Ground Collision Logic ---

  // --- Horizontal Movement Logic ---
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // When the left arrow or 'A' key is pressed
    if (xSpeed >= -20) {
      // Limit max speed to the left
      xSpeed -= xAcceleration;
    }
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // When the right arrow or 'D' key is pressed
    if (xSpeed <= 20) {
      // Limit max speed to the right
      xSpeed += xAcceleration;
    }
  } else {
    // Apply friction when no keys are pressed
    if (xSpeed != 0) xSpeed *= xFriction;
  }

  xPos += xSpeed; // Update horizontal position

  // --- Screen "Wrap-Around" Logic ---
  let half = characterDiameter / 2;

  // Check if the character moves past the right edge
  if (xPos - half > width) {
    // Reappear on the left side
    xPos = -half;
  }

  // Check if the jumper moves past the left edge
  if (xPos + half < 0) {
    // Reappear on the right side
    xPos = width + half;
  }
}
