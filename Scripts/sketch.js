/*jshint esversion: 6 */
var ship;
var asteroids = [];
var lasers = [];
var particles = [];

function setup() {
	// put setup code here
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();

	for (var i = 0; i < 5; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw() {
	// put drawing code here
	if (keyIsDown(LEFT_ARROW)) {
		ship.turn(-0.08);
	} else if (keyIsDown(RIGHT_ARROW)) {
		ship.turn(0.05)
	} else if (keyIsDown(UP_ARROW)) {
		ship.move();
	}

	background(0, 100);
	for (let i = 0; i < asteroids.length; i++) {
		asteroids[i].update();
		asteroids[i].edges();
		asteroids[i].render();
		if (ship.collidesWith(asteroids[i])) {
			ship.isAlive = false;
			l1 = new BrokenShip1(ship.r, ship.pos);
			l2 = new BrokenShip2(ship.r, ship.pos);
			l3 = new BrokenShip3(ship.r, ship.pos);
			for (let j = 0; j < 10; j++) {
				particles.push(new Particle(ship.pos));
			}

			ship.pos.x = -20;
			ship.pos.y = -20;
		}
	}

	for (let i = lasers.length - 1; i >= 0; i--) {
		lasers[i].update();
		lasers[i].render();
		if (lasers[i].offScreen()) {
			lasers[i].isOffscreen = true;
		}

		for (let j = asteroids.length - 1; j >= 0; j--) {
			if (lasers[i].hit(asteroids[j])) {
				if (asteroids[j].r > 15) {
					let newAsteroids = asteroids[j].breakup();
					asteroids = asteroids.concat(newAsteroids);

				}
				for (l = 0; l < 10; l++) {
					particles.push(new Particle(asteroids[j].pos));
				}
				lasers.splice(i, 1);
				asteroids.splice(j, 1);
				break;

			}
		}
	}

	for (i = lasers.length - 1; i >= 0; i--) {
		if (lasers[i].isOffscreen == true) {
			lasers.splice(i, 1);
		}
	}
	for (i = particles.length - 1; i >= 0; i--) {
		if (particles.length > 0) {
			particles[i].update();
			particles[i].render();
		}
	}

	for (i = particles.length - 1; i >= 0; i--) {
		if (particles[i].isDead()) {
			particles.splice(i, 1);
		}
	}

	if (ship.isAlive == true) {
		ship.edges();
		ship.render();
		ship.update();
	} else {
		l1.render();
		l1.update();
		l2.render();
		l2.update();
		l3.render();
		l3.update();

		textSize(32);
		textAlign(CENTER, CENTER);
		textFont('Orbitron');
		fill(255);
		stroke(255, randomGaussian(100, 0.5));
		strokeWeight(randomGaussian(4, 0.5));
		text('Game Over', width / 2, height / 2);
	}
	//	for (i = 0; i < width; i += 40) {
	//		push();
	//		translate(width / 2, height / 2), 0.5
	//		noStroke();
	//		fill('rgba(76, 70, 77, 0.01)');
	//		ellipse(0, 0, width + 1000, i);
	//		pop()
	//	}


	for (i = 0; i < height; i += 5) {
		stroke('rgba(18, 16, 16, 0.25)');
		strokeWeight(8);
		line(0, i, width, i);
	}
}

function keyTyped() {
	if (key === " " && ship.isAlive == true) {
		lasers.push(new Laser(ship.pos, ship.heading))
	}
}