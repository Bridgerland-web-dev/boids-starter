const flock = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	summonBoids(200);
}

function draw() {
	background(31);

	for (const boid of flock) {
		boid.wrap(createVector(0, 0), createVector(width, height));

		let separation = boid.createBoidForce();

		for (const flockmate of flock) {
			if (boid == flockmate) continue;

			boid.assignSeparationForce(flockmate, separation);
		}

		boid.applySeparationForce(separation);

		boid.update();
		boid.draw();
	}
}

function summonBoids(count) {
	for (let i = 0; i < count; i++) {
		const velocity = p5.Vector.random2D();
		velocity.setMag(random(1, 5));

		const boid = new Boid({
			pos: createVector(random(width), random(height)),
			vel: velocity,
			color: color(random(100, 255), random(50, 255), 100),
			scale: 2,
		});
		flock.push(boid);
	}
}
