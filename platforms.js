let isCameraScrolled = false;

function setYPos(newYPos) {
  yPos = newYPos;
}

let platforms = []; // An empty list to start

function platformsPositionGen() {
  return [
    { x: randomFromRange(50, 400), y: 400 },
    { x: randomFromRange(50, 400), y: 200 },
    { x: randomFromRange(50, 400), y: 600 },
    { x: randomFromRange(50, 400), y: 500 },
    { x: randomFromRange(50, 400), y: 100 },
  ];
}

function platformShape(x, y, height) {
  fill(150, 75, 0);
  rect(x, y, 100, height);
}

function platformsDraw(platforms) {
  for (let p of platforms) {
    platformShape(p.x, p.y, 20);
  }
}

function platformScroll(platforms, yPos) {
  if (yPos < 200) {
    isCameraScrolled = true;
    let shift = 200 - yPos;
    yPos = 200;

    for (let p of platforms) {
      p.y += shift;
      if (p.y >= height) {
        p.y = 0;
        p.x = randomFromRange(50, 400);
      }
    }
    return yPos;
  }
  return yPos;
}