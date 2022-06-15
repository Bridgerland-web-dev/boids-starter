class Boid {
	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0);

	constructor(boid) {
		this.pos = boid.pos || this.pos;
		this.vel = boid.vel || this.vel;
		this.acc = boid.acc || this.acc;
	}

	wrap(min, max, bleed = 10) {
		const x = this.pos.x;
		const y = this.pos.y;

		if (x < min.x - bleed) {
			this.pos.x = max.x + bleed;
		}
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	draw() {
		stroke(255);
		strokeWeight(10);
		point(this.pos.x, this.pos.y);
	}
}
