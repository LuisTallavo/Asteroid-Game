function Ship()
{
	this.lives = 3;
	this.position = createVector(750,400);
	this.velocity = createVector(0,0);
	this.heading = -PI/2;
	this.size = 17;
	this.active = true;

	this.show = function()
	{
		push();
		fill(0);
		strokeWeight(2);
		stroke(101,115,126);
		translate(this.position.x,this.position.y);
		rotate(this.heading + PI/2);
		triangle(0, -this.size - 5, this.size, this.size, -this.size, this.size);
		pop();

	}
	this.turn = function(angle)
	{

		this.heading += angle
	}

	this.update = function()
	{
		this.position.add(this.velocity);
		this.wraparound();
	}

	this.wraparound = function()
	{
		if (this.position.x > window.innerWidth)
		{
			this.position.x = -this.size
		}
		if (this.position.x < -this.size)
		{
			this.position.x = window.innerWidth
		}
		if (this.position.y > window.innerHeight)
		{
			this.position.y = -this.size
		}
		if (this.position.y < -this.size)
		{
			this.position.y = window.innerHeight
		}
	}

	this.hits = function(meteor)
	{
		var d =  dist(this.position.x, this.position.y, meteor.position.x, meteor.position.y);
		return (d < (meteor.size + 15));
	}

	this.reset = function()
	{
		this.position = createVector(750,400);
		this.velocity = createVector(0,0);
		this.heading = -PI/2;
		this.size = 17;
		this.active = true;
	}
}
