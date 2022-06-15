class Boid {
	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0);
	color = color(255);
	scale = 1;

	constructor(boid) {
		this.pos = boid.pos || this.pos;
		this.vel = boid.vel || this.vel;
		this.acc = boid.acc || this.acc;
		this.color = boid.color || this.color;
		this.scale = boid.scale || this.scale;
	}

	wrap(min, max, bleed = 10) {
		const x = this.pos.x;
		const y = this.pos.y;

		if (x < min.x - bleed) {
			this.pos.x = max.x + bleed;
		} else if (x > max.x + bleed) {
			this.pos.x = min.x - bleed;
		}
		if (y < min.y - bleed) {
			this.pos.y = max.y + bleed;
		} else if (y > max.y + bleed) {
			this.pos.y = min.y - bleed;
		}
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	draw() {
		fill(this.color);
		noStroke();

		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		const scale = this.scale;
		beginShape();
		vertex(0 * scale, -7 * scale);
		vertex(-3 * scale, 7 * scale);
		vertex(0 * scale, 5 * scale);
		vertex(3 * scale, 7 * scale);
		endShape(CLOSE);
		pop();
	}
}
