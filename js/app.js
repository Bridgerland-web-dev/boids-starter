const flock = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	summonBoids(200);
}

function draw() {
	background(31);

	for (let i = 0; i < flock.length; i++) {
		const boid = flock[i];

		boid.wrap(createVector(0, 0), createVector(width, height));
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
			color: color(random(250, 255), random(50, 255), 100),
			scale: 2,
		});
		flock.push(boid);
	}
}
