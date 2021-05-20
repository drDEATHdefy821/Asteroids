/*jshint esversion: 6 */
class Asteroid {
	constructor(pos, r, vel) {
		if (pos) {
			this.pos = pos.copy();
		} else {
			this.pos = createVector(random(width) + width, random(height) + height);
		}
		if (r) {
			this.r = r;
		} else {
			this.r = random(15, 50);
		}

		this.vel = p5.Vector.random2D();
		this.points = floor(random(5, 15));
		this.offset = [];
		for (var i = 0; i < this.points; i++) {
			this.offset[i] = random(-this.r / 2, this.r / 2);
		}
	}

	update() {
		this.pos.add(this.vel);
	}

	render() {

		push();

		translate(this.pos.x, this.pos.y);
		//ellipse(this.pos.x, this.pos.y, this.r);
		beginShape();
		//stroke(255);
		//strokeWeight(2);
		stroke(255);
		strokeWeight(randomGaussian(2, 0.7));
		noFill();
		for (var i = 0; i < this.points; i++) {
			var angle = map(i, 0, this.points, 0, TWO_PI);
			var r = this.r + this.offset[i];
			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
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

	breakup() {
		let newA = [];
		newA[0] = new Asteroid(this.pos, this.r / 2);
		newA[1] = new Asteroid(this.pos, this.r / 2);
		return newA;
	}
}