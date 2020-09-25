const G = 6.673 * 10^11 //N•m2/kg2
const Msun = 1.989 * 10^30 //kg
const Mearth = 5.98 * 10^24 //kg

// Might be useful https://evgenii.com/blog/earth-orbit-simulation/
// some more .. https://evgenii.com/blog/three-body-problem-simulator/
//! and some moooore : https://medium.com/analytics-vidhya/simulating-the-solar-system-with-under-100-lines-of-python-code-5c53b3039fc6

const Xcenter = window.innerWidth / 2;
const Ycenter = window.innerHeight / 2;

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
        // Distance between two object = R
        let Dobj_sun = Math.sqrt((Xcenter - this.position.x) ^ 2 + (Ycenter - this.position.y) ^2);
        
        // Orbital speed v = Math.sqrt(G * Msun / Dobj_sun)
        
        // Velocity changes according to newton's law
        this.velocity.add();
        
        // // Velocity changes according to acceleration
        // this.velocity.add(this.acceleration);

        // position changes by velocity
        this.position.add(this.velocity);

        // We must clear acceleration each frame
        this.acceleration.mult(0);
    }

    InterstellarObject.prototype.applyForce = function (force) {
        const R = Math.sqrt((Xcenter - this.position.x) ^ 2 + (Ycenter - this.position.y) ^2);
        const a = (G * Msun) / R^2

        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // Safe set the sun in the center
    background("#0c1f36");
    ellipse(Xcenter, Ycenter, 80, 80);
}

function mousePressed() {
    InterstellarObjects.push(new InterstellarObject(2, mouseX, mouseY))
}


function draw_sun() {
    fill(color('#fff236'));
    noStroke();
    ellipse(Xcenter, Ycenter, 80, 80);
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