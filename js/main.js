// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ant(x, y, size = 1, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    // As of now, the ants are squared.
    Ant.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }

    Ant.prototype.wander = function () {

        let fx = random(-antSpeed, antSpeed);
        let fy = random(-antSpeed, antSpeed);

        if ((this.x + this.size) >= xCanvasize + xCanvaPos && fx > 0) {
            fx = -fx;
        } else if ((this.x - this.size) <= xCanvaPos && fx < 0) {
            fx = -fx;
        }

        if ((this.y + this.size) >= yCanvasize + yCanvaPos && fy > 0) {
            fy = -fy;
        } else if ((this.y - this.size) <= yCanvaPos && fy < 0) {
            fy = -(fy);
        }

        this.x += fx;
        this.y += fy;
    }
}


const xCanvasize = 700;
const yCanvasize = 400;
const xCanvaPos = width / 2 - xCanvasize / 2;
const yCanvaPos = height / 2 - yCanvasize / 2;

const size = 2;
let antSpeed = $('#speed').val();
let nbAgent = $('#points').val();

// center
// const xStartAnt = width / 2;
// const yStartAnt = height / 2;

// top left
const xStartAnt = xCanvaPos + 1;
const yStartAnt = yCanvaPos + 1;

let ants = [];

function addAnt(width, height, size) {
    //! does not work so well
    //! https://www.w3schools.com/colors/colors_rgb.asp
    const shade = random(0, 70);
    let ant = new Ant(
        width, height,
        size,
        'rgb(' + random(140, 255) + ',' + shade + ',' + shade + ')',
    );

    ants.push(ant);
}

while (ants.length < nbAgent) {
    addAnt(xStartAnt, yStartAnt, size);
}

function runAgents() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    let new_nbAgent = $('#points').val();
    antSpeed = $('#speed').val();


    if (new_nbAgent > nbAgent) {
        while (ants.length < new_nbAgent) {
            console.log(ants.length);
            addAnt(xStartAnt, yStartAnt, size);
        }
    } else if (new_nbAgent < nbAgent) {
        while (ants.length > new_nbAgent) {
            console.log(ants.length);
            ants.pop();
        }
    }

    nbAgent = new_nbAgent;

    // Draw a rectangle in the center of the canvas of size xCanvasize x yCanvasize
    ctx.strokeStyle = 'white';
    ctx.strokeRect(xCanvaPos, yCanvaPos, xCanvasize, yCanvasize);

    for (let i = 0; i < ants.length; i++) {
        ants[i].draw();
        ants[i].wander();
    }

    requestAnimationFrame(runAgents);
}

runAgents();
