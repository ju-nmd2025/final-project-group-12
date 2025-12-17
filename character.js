import {
  isCameraScrolled,
  platforms,
  platformsPositionGen,
  setIsCameraScrolled,
  setScore,
  score,
  setMinY,
  setMaxY,
} from "./platforms.js";
import { debugMode, GameState, button } from "./utils.js";

export let xPos = 100; // Initial horizontal position
export let yPos = 400; // Initial vertical position
export let ySpeed = 1; // Initial vertical speed
export let xSpeed = 0; // Current horizontal speed
export let characterDiameter = 50;
export let xAcceleration = 1.2; // How fast the character speeds up horizontally
export let xFriction = 0.9; // Friction to slow down horizontal movement after key release
export let gravityAcceleration = 0.9; // Gravity effect
export let highScore = 0; // Current high score
export let highScoreText = "error"; // Text to display depending on player score

export let gameState = new GameState();

// Setter function for yPos to allow external modules to update it
export function setYPos(newYPos) {
  yPos = newYPos;
}

export function characterShape(x, y, diameter) {
  fill(100, 150, 255);
  circle(x, y, diameter);
  fill(255);
}

// Buttons
const startButton = new button(250, 350, 250, 100, "blue", "Start");
const retryButton = new button(250, 350, 200, 50, "green", "Retry");

export function restart() {
  gameState.changeState(gameState.states.game);
  setIsCameraScrolled(false); // Use setter function to update isCameraScrolled
  setScore(0); // Reset score to 0
  setMinY(40); // Reset minY to initial value
  setMaxY(100); // Reset maxY to initial value
  xPos = 100;
  yPos = 400;
  ySpeed = 1;
  xSpeed = 0;
  platforms.length = 0;
  platforms.push(...platformsPositionGen());
}

export function mouseClicked() {
  //Retry button
  if (
    mouseX >= retryButton.xCalculateNegative &&
    mouseX <= retryButton.xCalculatePosetive &&
    mouseY >= retryButton.yCalculateNegative &&
    mouseY <= retryButton.yCalculatePosetive &&
    gameState.currentState === gameState.states.endScreen
  ) {
    restart();
  } else if (
    mouseX >= startButton.xCalculateNegative &&
    mouseX <= startButton.xCalculatePosetive &&
    mouseY >= startButton.yCalculateNegative &&
    mouseY <= startButton.yCalculatePosetive &&
    gameState.currentState === gameState.states.startScreen
  ) {
    restart();
  }
}

// Make mouseClicked globally available so p5.js can find it
window.mouseClicked = mouseClicked;

export function showStartScreen() {
  if (gameState.currentState === gameState.states.startScreen) {
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

export function showEndScreen() {
  // If the player have made the camera scroll the player can trigger a game over
  if (yPos + characterDiameter / 2 > height && isCameraScrolled === true) {
    if (debugMode == false) {
      gameState.changeState(gameState.states.endScreen);
      // High score functionality
      if (score >= highScore) {
        highScoreText = "NEW HIGH SCORE";
        highScore = score;
      } else {
        highScoreText = "Give It Another GO!!!";
      }
      push();
      fill(0, 0, 0, 150);
      quad(0, 0, 500, 0, 500, 700, 0, 700);
      pop();
      push();
      fill("red");
      textStyle(BOLD);
      textSize(50);
      textAlign(CENTER);
      text("YOU ARE DEAD!", 500 / 2, 100);
      pop();
      push();
      fill("white");
      textStyle(BOLD);
      textSize(25);
      textAlign(CENTER);
      text(highScoreText, 500 / 2, 150);
      pop();
      push();
      fill("white");
      textStyle(BOLD);
      textSize(25);
      textAlign(CENTER);
      text(`Your score is ${score}!`, 500 / 2, 200);
      pop();
      retryButton.draw();
    } else {
      ySpeed = -35;
      yPos = height - characterDiameter / 2;
    }
  }
}

export function characterCollision(platforms) {
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
      if (xPos + 10 > p.x && xPos - 10 < p.x + p.width) {
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

export function characterMovement() {
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
