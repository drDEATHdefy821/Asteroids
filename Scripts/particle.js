/*jshint esversion: 6 */
class Particle {
	constructor(pos) {
		this.pos = pos.copy();
		this.vel = p5.Vector.random2D();
		this.lifeTime = random(100, 200);
	}

	update() {
		this.pos.add(this.vel);
		this.lifeTime -= 1;
	}

	render() {
		stroke(255);
		strokeWeight(randomGaussian(4, 0.5));
		noFill();
		point(this.pos.x, this.pos.y);
	}

	isDead() {
		if (this.lifeTime < 0) {
			return true;
		}
	}
}