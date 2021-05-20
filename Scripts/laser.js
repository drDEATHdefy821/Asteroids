/*jshint esversion: 6 */
class Laser {
	constructor(spos, angle) {
		this.pos = createVector(spos.x, spos.y);
		this.vel = p5.Vector.fromAngle(angle);
		this.vel.mult(10);
		this.isOffscreen = false;
	}

	update() {
		this.pos.add(this.vel);
	}

	hit(asteroid) {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < asteroid.r) {
			return true;
		}
	}

	render() {
		push();
		stroke(255);
		strokeWeight(randomGaussian(4, 0.5));
		noFill();
		point(this.pos.x, this.pos.y);
		pop();
	}

	offScreen() {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			return true;
		}
	}
}