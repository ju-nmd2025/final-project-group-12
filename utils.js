function randomFromRange(min, max) {
    return Math.random() * (max - min) + min;
}

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