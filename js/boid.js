class Boid {
	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0);
	color = color(255);
	scale = 1;
	radius = 30;

	constructor(boid) {
		this.pos = boid.pos || this.pos;
		this.vel = boid.vel || this.vel;
		this.acc = boid.acc || this.acc;
		this.color = boid.color || this.color;
		this.scale = boid.scale || this.scale;
		this.radius = boid.radius || this.radius;
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

	applyForce(force) {
		this.acc.add(force);
	}

	createBoidForce() {
		return [createVector(0, 0), 0];
	}

	assignSeparationForce(flockmate, boidForce, radius = undefined) {
		const r = radius ?? this.radius;
		const [force] = boidForce;

		const d = dist(
			this.pos.x,
			this.pos.y,
			flockmate.pos.x,
			flockmate.pos.y,
		);

		if (d < r) {
			const diff = p5.Vector.sub(this.pos, flockmate.pos);
			diff.div(d);
			force.add(diff);

			boidForce[0].add(diff);
			boidForce[1]++;
		}
	}

	applySeparationForce(boidForce, maxForce = 0.2, maxSpeed = 4) {
		const [force, count] = boidForce;
		if (count > 0) {
			force.div(count);
			force.mult(maxSpeed);
			force.sub(this.vel);
			force.limit(maxForce);
			this.applyForce(force);
		}
	}

	assignAlignmentForce(flockmate, boidForce, radius = undefined) {
		const r = radius ?? this.radius;
		let d = dist(this.pos.x, this.pos.y, flockmate.pos.x, flockmate.pos.y);

		if (d < r) {
			boidForce[0].add(flockmate.vel);
			boidForce[1]++;
		}
	}

	applyAlignmentForce(boidForce, maxForce = 0.2, maxSpeed = 4) {
		const [force, count] = boidForce;

		if (count > 0) {
			force.div(count);
			force.setMag(maxSpeed);
			force.sub(this.vel);
			force.limit(maxForce);
			this.applyForce(force);
		}
	}

	assignCohesionForce(flockmate, boidForce, radius = undefined) {
		const r = radius ?? this.radius;
		const d = dist(
			this.pos.x,
			this.pos.y,
			flockmate.pos.x,
			flockmate.pos.y,
		);

		if (d < r) {
			boidForce[0].add(flockmate.pos);
			boidForce[1]++;
		}
	}

	applyCohesionForce(boidForce, maxForce = 0.2, maxSpeed = 4) {
		const [force, count] = boidForce;

		if (count > 0) {
			force.div(count);
			force.sub(this.pos);
			force.setMag(maxSpeed);
			force.sub(this.vel);
			force.limit(maxForce);
			this.applyForce(force);
		}
	}

	applyAvoidPointForce(
		vector,
		maxForce = 0.2,
		maxSpeed = 4,
		radius = undefined,
	) {
		const r = radius ?? this.radius;
		const steering = createVector(0, 0);
		let count = 0;

		const d = dist(this.pos.x, this.pos.y, vector.x, vector.y);

		if (d < r) {
			const diff = p5.Vector.sub(this.pos, vector);
			diff.div(d);
			steering.add(diff);
			count++;
		}

		if (count > 0) {
			steering.div(count);
			steering.setMag(maxSpeed);
			steering.sub(this.vel);
			steering.limit(maxForce);
			this.applyForce(steering);
		}
	}

	update(maxSpeed = 5) {
		this.vel.add(this.acc);
		this.vel.limit(maxSpeed);
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
		// ellipse(this.pos.x, this.pos.y, this.scale * 20, this.scale * 20);
	}
}
