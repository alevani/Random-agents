let InterstellarObjects = [];

let InterstellarObject = function (m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    InterstellarObject.prototype.display = function () {
        stroke(0);
        strokeWeight(2);
        fill("#2fa5f5");
        ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
    }

    InterstellarObject.prototype.update = function () {
        // Velocity changes according to acceleration
        this.velocity.add(this.acceleration);

        // position changes by velocity
        this.position.add(this.velocity);

        // We must clear acceleration each frame
        this.acceleration.mult(0);
    }

    InterstellarObject.prototype.applyForce = function (force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // Safe set the sun in the center
    background("#0c1f36");
    ellipse(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
}

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
        let gravity = createVector(0, 0.1 * InterstellarObjects[i].mass);
        InterstellarObjects[i].applyForce(gravity);

        InterstellarObjects[i].display();
        InterstellarObjects[i].update();
    }

}