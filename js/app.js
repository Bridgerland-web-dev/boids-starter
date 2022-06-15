const flock = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	summonBoids(100);
}

function draw() {
	background(31);

	for (let i = 0; i < flock.length; i++) {
		const boid = flock[i];
		boid.draw();
	}
}

function summonBoids(count) {
	for (let i = 0; i < count; i++) {
		const boid = new Boid({
			pos: createVector(random(width), random(height)),
		});
		flock.push(boid);
	}
}
