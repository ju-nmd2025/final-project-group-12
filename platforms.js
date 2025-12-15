import { randomFromRange } from "./utils.js";
import { setYPos as updateYPos } from "./character.js";

export const breakingPlatfrormChance = 0.1; // A probability of platform being spawned as the moving type
export const movingPlatformChance = 0.1; // A probability of platform being spawned as the moving type

export let score = 0;
export let isCameraScrolled = false; // A toggle to check if the camera has scrolled, so we know when to apply ground collision logic

export let minY = 40;
export let maxY = 100;

// Setter function for isCameraScrolled to allow external modules to update it
export function setIsCameraScrolled(value) {
  isCameraScrolled = value;
}

// Setter function for score to allow external modules to update it
export function setScore(value) {
  score = value;
}

// Setter functions for minY and maxY to allow external modules to update them
export function setMinY(value) {
  minY = value;
}

export function setMaxY(value) {
  maxY = value;
}

// Re-export setYPos for use in game.js (wrapper that calls character.js setter)
export function setYPos(newYPos) {
  updateYPos(newYPos);
}

export let platforms = []; // An empty list of platfroms that will be populated in game.js later

// Platform class
class Platform {
  constructor(x, y, type = "normal") {
    // If no type is provided, it will be "normal"
    this.x = x;
    this.y = y;
    this.width = 70; // Platform width
    this.height = 15; // Platform height
    this.type = type;
    this.touched = false; // To track if a breaking platform has been touched
    this.randomValue = randomFromRange(0, 100); // Random value for moving platform movement variation
  }
  // Draw method (alpha parameter for breaking platform fade effect)
  draw(alpha = false) {
    if (this.type === "breaking") {
      if (alpha == true) {
        // If alpha is true, apply transparency (used for breaking types when they are touched)
        let c = color(200, 50, 50, 50);
        fill(c);
      } else {
        // If breaking platfrom is not touched, draw normally
        fill(200, 50, 50);
      }
    } else if (this.type === "moving") {
      fill("green");
    } else {
      // Normal platform color
      fill(150, 75, 0);
    }
    rect(this.x, this.y, this.width, this.height); // Draw the platform
  }
}

// Function to generate initial platform positions
export function platformsPositionGen() {
  const newPlatforms = []; // An empty list to store newly generated platforms
  let lastY = -200;

  // Keep adding platforms until the screen is full vertically
  while (lastY < height - 100) {
    const y = lastY + randomFromRange(40, 100); // Add a new y position with a random gap
    const x = randomFromRange(50, 400); // Creates x for this platform and randomizes the x position within the canvas width
    lastY = y; // Update the lastY to the current platform's y

    let type = Math.random() < breakingPlatfrormChance ? "breaking" : "normal"; // If the random number(0-10) is less than the chance(breakingPlatformChance), set type to breaking, else normal
    if (type != "breaking") {
      type = Math.random() < movingPlatformChance ? "moving" : "normal";
    }
    newPlatforms.push(new Platform(x, y, type)); // Create a new platform with generated x, predefined y, and type; then add it to the newPlatforms list
  }
  return newPlatforms; // Return the list of newly generated platforms
}

// Function to draw platforms
export function platformsDraw(platforms) {
  // Iterate through the platforms list backwards (from last platfromn on the list to the first)
  for (let i = platforms.length - 1; i >= 0; i--) {
    const p = platforms[i]; // Create a variable p that references the current platform in the loop

    // If the platform is of breaking type and has been touched
    if (p.type === "breaking" && p.touched == true) {
      p.draw(true); // Draw the platform with transparency
    } else {
      p.draw(); // Else draw normally
    }

    if (p.type === "moving") {
      // If the platform is of moving type
      p.x += Math.sin((frameCount + p.randomValue) * 0.03) * 2; // Move the platform left and right using a sine wave for smooth movement
    }
  }
}

// Function to handle platform scrolling
export function platformScroll(platforms, yPos) {
  let shift = 0; // create a shift variable to track how much the platforms need to move down
  if (yPos < 200) {
    isCameraScrolled = true; // Means the camera has scrolled and now the end screen logic can be applied in character.js
    shift = 200 - yPos; // Calculate the shift amount based on how far the character is above the 200 yPos threshold
    yPos = 200;
    score += Math.floor(shift / 10); // Locks the character's yPos to 200 to create the scrolling effect

    // Move all platforms down by the shift amount
    for (let p of platforms) {
      p.y += shift; // Move platform down
      if (p.width >= 30) {
        p.width -= score / 1000000; // Gradually decrease platform width as score increases
      }
      // If a platform moves below the canvas, reset it to the top with a new random x position and type
      if (p.y >= height) {
        // Find the y position of the highest platform on the screen
        let highestPlatformY = Infinity;
        for (let otherP of platforms) {
          if (otherP.y < highestPlatformY) {
            highestPlatformY = otherP.y;
          }
        }
        // Position the recycled platform above the highest one, but ensure it's out of bounds
        // Calculate desired position based on spacing
        if (minY <= 300) {
          minY += score / 2000;
        }
        if (maxY <= 300) {
          maxY += score / 3000;
        }
        if (minY >= 300 && maxY >= 300) {
        }

        let desiredY = highestPlatformY - randomFromRange(minY, maxY);
        // Ensure the platform is positioned well above the screen (out of bounds)
        // Position it at least 150 pixels above the top of the screen to guarantee it's not visible
        // This way it will smoothly scroll into view as the game progresses
        p.y = Math.min(desiredY, -150);
        p.x = randomFromRange(50, 400); // New random x position
        p.type =
          Math.random() < breakingPlatfrormChance ? "breaking" : "normal"; // If the random number(0-10) is less than the chance(breakingPlatformChance), set type to breaking, else normal
        if (p.type != "breaking") {
          p.type = Math.random() < movingPlatformChance ? "moving" : "normal";
        }
        p.touched = false; // Reset touched status for breaking platforms
      }
    }
  }
  return { newYPos: yPos, shift: shift };
}
