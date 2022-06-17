const flock = [];
let max, min;

let sound;
let isPlaying = false;

let hasCleaned = true;

let red = 0;
let isRed = false;

const MAX_SPEED = 20;

function preload() {
	sound = loadSound("./noise.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	min = createVector(0, 0);
	max = createVector(width, height);

	summonBoids(200);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	max = createVector(windowWidth, windowHeight);
}

function mousePressed() {
	if (!isPlaying) {
		isPlaying = true;
		sound.play();
	}
}

function mouseReleased() {
	if (isPlaying) {
		isPlaying = false;
		sound.stop();
	}
}

function keyPressed() {
	if (key == " ") {
		hasCleaned = false;
	}
}

function keyReleased() {
	if (key == " ") {
		hasCleaned = true;
	}

	if (key == "r") {
		if (isRed == true) {
			isRed = false;
			red = 0;
		} else {
			isRed = true;
			red = 255;
		}
	}
}

function draw() {
	if (hasCleaned) background(31);

	for (const boid of flock) {
		boid.wrap(min, max);

		const redAmt = map(boid.vel.mag(), 0, MAX_SPEED, 0, 255);

		boid.color = color(redAmt, 255 - redAmt, 50);

		let separation = boid.createBoidForce();
		let alignment = boid.createBoidForce();
		let cohesion = boid.createBoidForce();

		for (const flockmate of flock) {
			if (boid == flockmate) continue;

			boid.assignSeparationForce(flockmate, separation, 30);
			boid.assignAlignmentForce(flockmate, alignment, 30);
			boid.assignCohesionForce(flockmate, cohesion, 40);
		}

		boid.applySeparationForce(separation, 0.23, 3.1);
		boid.applyAlignmentForce(alignment, 0.15, 3.12);
		boid.applyCohesionForce(cohesion, 0.08, 2.8);

		if (mouseIsPressed) {
			if (mouseButton === LEFT) {
				boid.applyAvoidPointForce(
					createVector(mouseX, mouseY),
					2,
					20,
					500,
				);
			} else if (mouseButton === RIGHT) {
				boid.applyPursuePointForce(
					createVector(mouseX, mouseY),
					1,
					8,
					400,
				);
			}
		}

		boid.update(20);
		boid.draw();
	}
}

function summonBoids(count) {
	for (let i = 0; i < count; i++) {
		const velocity = p5.Vector.random2D();
		velocity.setMag(random(1, 5));
		const c = color(red, random(100, 255), 50);

		const boid = new Boid({
			pos: createVector(random(width), random(height)),
			vel: velocity,
			color: c,
			scale: 2,
		});
		flock.push(boid);
	}
}
