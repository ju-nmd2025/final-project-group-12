const breakingPlatfrormChance = 0.1;

let isCameraScrolled = false;

function setYPos(newYPos) {
  yPos = newYPos;
}

let platforms = []; // An empty list to start

class Platform {
  constructor(x, y, type = "normal") {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 15;
    this.type = type;
    this.touched = false;
  }
  draw(alpha = 100) {
    if (this.type === "breaking") {
      if (alpha != 100) {
        let c = color(200, 50, 50, alpha);
        fill(c);
      } else {
        fill(200, 50, 50);
      }
    } else {
      fill(150, 75, 0);
    }
    rect(this.x, this.y, this.width, this.height);
  }
}
function platformsPositionGen() {
  const newPlatforms = [];
  const yPositions = [100, 200, 400, 500, 600];
  for (const y of yPositions) {
    const x = randomFromRange(50, 400);
    const type = Math.random() < breakingPlatfrormChance ? "breaking" : "normal";
    newPlatforms.push(new Platform(x, y, type));
  }
  return newPlatforms;
}

function platformsDraw(platforms) {
  for (let i = platforms.length - 1; i >= 0; i--) {
    const p = platforms[i];
    if (p.type === "breaking" && p.touched == true) {
      p.draw(50);
    } else {
      p.draw();
    }
  }
}

function platformScroll(platforms, yPos) {
  let shift = 0;
  if (yPos < 200) {
    isCameraScrolled = true;
    shift = 200 - yPos;
    yPos = 200;

    for (let p of platforms) {
      p.y += shift;
      if (p.y >= height) {
        p.y = 0;
        p.x = randomFromRange(50, 400);
        p.type = Math.random() < breakingPlatfrormChance ? "breaking" : "normal";
        p.touched = false;
      }
    }
  }
  return { newYPos: yPos, shift: shift };
}
