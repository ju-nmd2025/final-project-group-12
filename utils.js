// Class that keep track of gamestates
export class GameState {
  states = {
    //GAMEPLAY STATES
    game: "game",
    //UI STATES
    startScreen: "startScreen",
    endScreen: "endScreen",
  };

  constructor() {
    // Default State
    this.currentState = this.states.startScreen;
  }

  changeState(newState) {
    this.currentState = newState;
  }
}
// Toggles the debug information and end screen display (so you don't die when you fall, but bounce off instead)
let debugMode = false;

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

class button {
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
    this.visible = false;
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