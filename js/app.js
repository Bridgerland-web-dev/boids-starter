const flock = [];
let max, min;

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

			boid.assignSeparationForce(flockmate, separation, 40);
			boid.assignAlignmentForce(flockmate, alignment, 60);
			boid.assignCohesionForce(flockmate, cohesion, 30);
		}

		boid.applySeparationForce(separation, 0.095, 3);
		boid.applyAlignmentForce(alignment, 0.2, 3.25);
		boid.applyCohesionForce(cohesion, 0.1, 3);

		boid.update(4);
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
			color: color(random(50, 255), random(50, 255), 150),
			scale: 2,
		});
		flock.push(boid);
	}
}
