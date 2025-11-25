function jumper(x, y, diameter) {
    fill(100, 150, 255);
    circle(x, y, diameter);
    fill(255);
    
}

function CharacterCollision(posx, posy) {
    if (yPos + jumperDiameter / 2 > (height)) {
    ySpeed = -25; 
    yPos = (height) - jumperDiameter / 2;
    }

    // Platform Collision Logic
    for (let p of platforms) {
        platform(p.x, p.y, 20);

        let ballBottom = yPos + jumperDiameter / 2;

        if (ySpeed > 0) {
        // 2. Are we within the Left and Right edges of the platform?
            if (xPos > posx && xPos < posx + 100) {
                // 3. Have we hit the top? 
                // Check if the bottom is below the platform top, but NOT deeper than the platform thickness (or a threshold)
                if (ballBottom >= posy && ballBottom <= posy + 25) {
                    ySpeed = -25; 
                    // Snap the ball to the top so it doesn't get stuck
                    yPos = posy - jumperDiameter / 2;
                }
            }
        }

    }
}

function CharacterMovement() {
    ySpeed += gravityAcceleration; // Apply gravity
    yPos += ySpeed; // Update vertical position

    // --- Ground Collision Logic ---
    

    // --- Horizontal Movement Logic ---
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // When the left arrow or 'A' key is pressed
        if (xSpeed >= -20) { // Limit max speed to the left
            xSpeed -= xAcceleration;
        }
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // When the right arrow or 'D' key is pressed
        if (xSpeed <= 20) { // Limit max speed to the right
            xSpeed += xAcceleration;
        } 
    } else { // Apply friction when no keys are pressed
        if (xSpeed != 0)
        xSpeed *= xFriction;
    } 

   
    xPos += xSpeed; // Update horizontal position

    // --- Screen "Wrap-Around" Logic ---
    let half = jumperDiameter / 2;

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