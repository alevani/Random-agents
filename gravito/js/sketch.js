let InterstellarObjects = [];

let InterstellarObject = function (m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
};

InterstellarObject.prototype.display = function () {
    stroke(0);
    strokeWeight(2);
    fill("#2fa5f5");
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
}



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // Set safe the sun in the center
    background("#0c1f36");
    ellipse(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
}

// When the user presses the mousepad
function mousePressed() {
    InterstellarObjects.push(new InterstellarObject(2, mouseX, mouseY))
}


function draw_sun() {
    fill(color('#fff236'));
    noStroke();
    ellipse(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
}

function draw() {
    background("#0c1f36");
    draw_sun();

    for (let i = 0; i < InterstellarObjects.length; i++) {
        InterstellarObjects[i].display();
    }

}