class Boid {
	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0);

	constructor(boid) {
		this.pos = boid.pos || this.pos;
		this.vel = boid.vel || this.vel;
		this.acc = boid.acc || this.acc;
	}

	draw() {
		stroke(255);
		strokeWeight(10);
		point(this.pos.x, this.pos.y);
	}
}
