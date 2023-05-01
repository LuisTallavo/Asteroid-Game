function meteor(multiplier, position, life)
{
	if (position)
	{
		this.position = position.copy();
	}else{
		this.position = createVector(random(width),random(height));
	}

	if (life) {
		this.lives = life;
	}
	else {
		this.lives = 4;
	}

	this.multiplier = multiplier

	this.velocity = createVector(random(-3, 3),random(-3, 3));
	this.heading = 0;
	this.size = random(10,20) * multiplier;
	this.rotspeed = random(-0.1,0.1);
	this.total = floor(random(5,15));
	this.offset = [];
	for (var i = 0; i < this.total; i++)
	{
		this.offset[i] = random(-25,25);
	}

	this.show = function()
	{
		push();
		noFill();
		stroke(90,77,65);
		strokeWeight(4);
		translate(this.position.x,this.position.y);
		rotate(this.heading);
		beginShape();
		for (var i = 0; i < this.total; i++)
		{
			var angle = map(i, 0, this.total, 0, TWO_PI);
			var r = this.size + this.offset[i]
			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE);
		pop();
	}

	this.update = function()
	{
		this.turn();
		this.position.add(this.velocity);
		this.wraparound();
	}

	this.dead = function () {
		if (this.lives <= 1) {
			return true;
		} else {
			return false;
		}
	}

	this.turn = function()
	{

		this.heading += this.rotspeed;
	}

	this.wraparound = function()
	{
		if (this.position.x > width + this.size)
		{
			this.position.x = -this.size
		}
		if (this.position.x < -this.size)
		{
			this.position.x = width + this.size
		}
		if (this.position.y > height + this.size)
		{
			this.position.y = -this.size
		}
		if (this.position.y < -this.size)
		{
			this.position.y = height + this.size
		}
	}

	this.break = function()
	{
		var newA = [];
		newA[0] = new meteor(this.multiplier - 1, this.position.add(createVector(random(-15,15),random(-15,15))), this.lives - 1);
		newA[1] = new meteor(this.multiplier - 1, this.position.add(createVector(random(-15,15),random(-15,15))), this.lives - 1);
		return newA;
	}
}
