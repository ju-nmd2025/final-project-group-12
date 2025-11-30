import { isCameraScrolled } from "./platforms.js";
import { debugMode } from "./utils.js";

let xPos = 100; // Initial horizontal position
let yPos = 400; // Initial vertical position
let ySpeed = 1; // Initial vertical speed
let xSpeed = 0; // Current horizontal speed
let characterDiameter = 50;
let xAcceleration = 1.2; // How fast the character speeds up horizontally
let xFriction = 0.9; // Friction to slow down horizontal movement after key release
let gravityAcceleration = 0.9; // Gravity effect

function characterShape(x, y, diameter) {
  fill(100, 150, 255);
  circle(x, y, diameter);
  fill(255);
}

function showEndScreen() {
  if (yPos + characterDiameter / 2 > height && isCameraScrolled === true) {
    if (debugMode == false) {
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
    } else {
      ySpeed = -25;
      yPos = height - characterDiameter / 2;
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
          if (p.touched == false) {
            if (p.type === "breaking") {
              p.touched = true;
            }
            ySpeed = -25;
            yPos = p.y - characterDiameter / 2;
          }
        }
      }
    }
  }
}

function characterMovement() {
  ySpeed += gravityAcceleration; // Apply gravity
  yPos += ySpeed; // Update vertical position

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
