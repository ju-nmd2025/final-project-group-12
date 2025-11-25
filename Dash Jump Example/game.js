import { character } from "./character";
import platform from "./platform";

function setup() {
    createCanvas(400, 400);
}

// Obstacle / Spike / Death
function drawObstacle() {
    push();
    fill("red");
    triangle(180, 300, 210, 240, 240, 300);
    pop();
}

let x = 100;
let y = 100;

function draw() {
    background(100, 100, 100);

    character.draw();
	platform.draw();

    platform.x -= 10;
    if(platform.x + platform.w < 0){
        platform.x = 500;
    }

    if(character.y + character.h < 300){
        character.y += 10;
    }

    // Floor
    line(0, 300, 400, 300);
}

function keyPressed(){
    if(character.y + character.h === 300){
        character.y -= 80;
    }
}