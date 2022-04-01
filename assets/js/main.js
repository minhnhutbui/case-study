let canvas = document.getElementById('canvas');
let canvasContext = canvas.getContext('2d');
let showScore = document.getElementById('score');

// Set up background
let background = new Image();
let floor = new Image();
let birdImg = new Image();
let upblock = new Image();
let downblock = new Image();

background.src = "./assets/img/background.png";
floor.src = "./assets/img/floor.png";
birdImg.src = "./assets/img/bird.png";
upblock.src = "./assets/img/upblock.png";
downblock.src = "./assets/img/downblock.png";

//Set up audio

let fly = new Audio();
let scoreSound = new Audio();

fly.src = "./assets/sound/fly.mp3";
scoreSound.src = "./assets/sound/score.mp3";

let score = 0;
let gap = 100; // khoảng trống giữa 2 ống
let constant; // khoảng cách từ trên cùng của ống trên đến đầu ống dưới

let bird = {
    x: background.width / 4,
    y: background.height / 2,
}

let block = [];

block[0] = {
    x: canvas.width,
    y: 0,
}

function run() {
    canvasContext.drawImage(background, 0, 0);
    canvasContext.drawImage(birdImg, bird.x, bird.y);
    
    for (let i = 0; i < block.length; i++) {
        constant = upblock.height + gap;
        canvasContext.drawImage(upblock, block[i].x, block[i].y); //ve ong tren
        canvasContext.drawImage(downblock, block[i].x, block[i].y + constant); // ve ong duoi
        block[i].x -= 5 // di chuyen ong sang trai

        if (block[i].x == canvas.width / 2) {
            block.push({
                x: canvas.width,
                y: Math.floor(Math.random() * upblock.height) - upblock.height
            })
        }
        if (block[i].x === 0) {
            block.splice(0, 1);
        }
        if (bird.x === block[i].x) {
            score++;
        }

    }
    showScore.innerHTML = `score:${score}`;
    bird.y += 1.5;
    requestAnimationFrame(run)
}

document.addEventListener("keydown", moveUp);

function moveUp() {
    bird.y -= 50;
}

// run();


