function Laser(spos, angle)
{
	this.velocity = p5.Vector.fromAngle(angle);
	this.velocity.mult(15);
	this.position = createVector(spos.x, spos.y);

	this.draw = function ()
	{
		push();
		stroke(255,0,0);
		strokeWeight(2);
		line(this.position.x, this.position.y, this.position.x + this.velocity.x, this.position.y + this.velocity.y);
		pop();
	}
	this.update = function()
	{
		this.position.add(this.velocity);
	}
	this.hits = function(meteor)
	{
		var d =  dist(this.position.x, this.position.y, meteor.position.x, meteor.position.y);
		return (d < (meteor.size + 5));
	}
}
