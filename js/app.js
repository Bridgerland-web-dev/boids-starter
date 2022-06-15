const flock = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	summonBoids(100);
}

function draw() {
	background(31);

	for (let i = 0; i < flock.length; i++) {
		const boid = flock[i];

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
		});
		flock.push(boid);
	}
}
