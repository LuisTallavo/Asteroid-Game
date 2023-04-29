let ship;
let rock = [];
let bullets = [];
let startnumasteroids;
let cooldown = 10;
let counter = cooldown;

function setup() 
{
	mode = 0;
	ship = new Ship();
	startnumasteroids = floor(random(4,8));
	for (let i = 0; i < startnumasteroids; i++)
	{
		rock.push(new meteor());
	}
	createCanvas(window.innerWidth, window.innerHeight);

}



function draw() 
{
	if (mode == 0) {
		if (keyIsPressed == true)
		{
			keypress();
		}
	}
	if (mode == 1) {
		background(0);

		if (keyIsPressed == true)
		{
			keypress();
		}
		for (let i = 0; i < rock.length; i++)
		{
			rock[i].show();
			rock[i].update();
		}
		for (let i = bullets.length-1; i >= 0; i--)
		{
			bullets[i].draw();
			bullets[i].update();
			BreakRock(i);
		}
		if (ship.active == true)
		{	
			ship.show();
			ship.update();
		}

		ShipCollide();

		if (counter >= 50 && ship.active == false)
		{
			ship.reset();
		}
		counter++;
	}
}

function keypress()
{
	if (keyIsDown(13)) {
		let e = document.querySelector("#startGame");
		e.style.display = 'none';
		mode = 1;
	}

	if (keyIsDown(LEFT_ARROW)) 
	{
		ship.turn(-0.1);
	}

	if (keyIsDown(RIGHT_ARROW)) 
	{
		ship.turn(0.1);
	}

	if (keyIsDown(UP_ARROW)) 
	{
		var force = p5.Vector.fromAngle(ship.heading);
		ship.velocity.add(force.mult(0.25));
	}

	if (keyIsDown(32))
	{
		if (counter >= cooldown && ship.active == true)
		{
			bullets.push(new Laser(ship.position, ship.heading));
			counter = 0;
		}
	}
}

function BreakRock(i)
{
	for (let j = rock.length-1; j >= 0; j--)
	{
		if (bullets[i].hits(rock[j]))
			{
				let newasteroids = rock[j].break();
				rock = rock.concat(newasteroids);
				rock.splice(j, 1);
				bullets.splice(i,1);
				break;
			}
	}
}

function ShipCollide()
{
	for (let i = 0; i < rock.length; i++)
	{
		if (ship.hits(rock[i]))
		{
			ship.active = false
			counter = 0;
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }
