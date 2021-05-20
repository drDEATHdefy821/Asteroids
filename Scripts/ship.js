/*jshint esversion: 6 */
class Ship {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(0, 0);
		this.r = 20;
		this.heading = 0;
		this.isAlive = true;
		this.isMoving = false;
		this.turningLeft = false;
		this.turningRight = false;
	}

	update() {
		this.pos.add(this.vel);
		this.vel.mult(0.99);
		this.isMoving = false;
		this.turningLeft = false;
		this.turningRight = false;
	}

	render() {
		push();
		translate(this.pos.x, this.pos.y);
		//strokeWeight(2);
		stroke(255);
		strokeWeight(randomGaussian(2, 0.5));
		beginShape();
		fill(0);
		rotate(this.heading + PI / 2);
		//triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		stroke(255);
		line(0, -this.r, -this.r, this.r + 10);
		line(0, -this.r, this.r, this.r + 10);
		line(-this.r + 5, this.r, this.r - 5, this.r);


		endShape();
		pop();

		if (this.isMoving == true) {
			push();
			translate(this.pos.x, this.pos.y);
			rotate(this.heading + PI / 2);
			//stroke(255);
			//strokeWeight(2);
			stroke(255);
			strokeWeight(randomGaussian(2, 0.5));
			line(0, this.r + 10, 8, this.r + 25);
			line(0, this.r + 10, -8, this.r + 25);
			pop();
		}
	}

	turn(angle) {
		this.heading += angle;

		if (angle > 0) {
			this.turningRight = true;
		} else if (angle < 0) {
			this.turningLeft = true;
		}
	}

	move() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.1)
		this.vel.add(force);
		this.isMoving = true;
	}

	edges() {
		if (this.pos.y >= height + this.r) {
			this.pos.y = 0 - this.r;
		} else if (this.pos.y <= 0 - this.r) {
			this.pos.y = height + this.r;
		}

		if (this.pos.x >= width + this.r) {
			this.pos.x = 0 - this.r;
		} else if (this.pos.x <= 0 - this.r) {
			this.pos.x = width + this.r;
		}
	}

	collidesWith(asteroid) {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
		if (d < this.r + asteroid.r) {
			return true;
		}
	}
}

class BrokenShip1 {
	constructor(r, spos) {
		this.r = r;
		this.pos = spos.copy();
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
	}

	render() {
		push();
		translate(this.pos.x, this.pos.y);
		//stroke(255);
		//strokeWeight(2);
		stroke(255);
		strokeWeight(randomGaussian(2, 0.5));
		line(0, -this.r, -this.r, this.r)
		pop();
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc / 0.1);
	}
}

class BrokenShip2 {
	constructor(r, spos) {
		this.r = r;
		this.pos = spos.copy();
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
	}

	render() {
		push();
		translate(this.pos.x, this.pos.y);
		//stroke(255);
		//strokeWeight(2);
		stroke(255);
		strokeWeight(randomGaussian(2, 0.5));
		line(0, -this.r, this.r, this.r)
		pop();
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc / 0.1);
	}
}

class BrokenShip3 {
	constructor(r, spos) {
		this.r = r;
		this.pos = spos.copy();
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
	}

	render() {
		push();
		translate(this.pos.x, this.pos.y);
		//stroke(255);
		//strokeWeight(2);
		stroke(255);
		strokeWeight(randomGaussian(2, 0.5));
		line(this.r, -this.r, -this.r, this.r)
		pop();
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc / 0.1);
	}
}