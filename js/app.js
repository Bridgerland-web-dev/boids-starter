const flock = [];
let max, min;

let sound;
let isPlaying = false;

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

function draw() {
	background(31);

	for (const boid of flock) {
		boid.wrap(min, max);

		let separation = boid.createBoidForce();
		let alignment = boid.createBoidForce();
		let cohesion = boid.createBoidForce();

		for (const flockmate of flock) {
			if (boid == flockmate) continue;

			boid.assignSeparationForce(flockmate, separation, 30);
			boid.assignAlignmentForce(flockmate, alignment, 60);
			boid.assignCohesionForce(flockmate, cohesion, 40);
		}

		boid.applySeparationForce(separation, 0.23, 3.1);
		boid.applyAlignmentForce(alignment, 0.15, 3.12);
		boid.applyCohesionForce(cohesion, 0.2, 2.8);

		if (mouseIsPressed) {
			boid.applyAvoidPointForce(createVector(mouseX, mouseY), 4, 30, 500);
		}

		boid.update(30);
		boid.draw();
	}
}

function summonBoids(count) {
	for (let i = 0; i < count; i++) {
		const velocity = p5.Vector.random2D();
		velocity.setMag(random(2, 4));

		const boid = new Boid({
			pos: createVector(random(width), random(height)),
			vel: velocity,
			color: color(random(250, 255), random(100, 255), 50),
			scale: 2,
		});
		flock.push(boid);
	}
}
