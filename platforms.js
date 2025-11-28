let isCameraScrolled = false;

function setYPos(newYPos) {
  yPos = newYPos;
}

let platforms = []; // An empty list to start

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height =20;
  }
  draw() {
    fill(150, 75, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

function platformsPositionGen() {
  return [
    new Platform(randomFromRange(50, 400), 400),
    new Platform(randomFromRange(50, 400), 200),
    new Platform(randomFromRange(50, 400), 600),
    new Platform(randomFromRange(50, 400), 500),
    new Platform(randomFromRange(50, 400), 100),
  ];
}

function platformsDraw(platforms) {
  for (let p of platforms) {
    p.draw();
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
      }
    }
  }
  return { newYPos: yPos, shift: shift };
}
