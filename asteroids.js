let ship;
let rock = [];
let bullets = [];
let startnumasteroids;
let cooldown = 10;
let counter = cooldown;
let mode = 0;
let score = 0;
let startAst = [4,8]
let gamePause = false;
let gameStat = true;


function setup() 
{
	ship = new Ship();
	startnumasteroids = floor(random(startAst[0],startAst[1]));
	for (let i = 0; i < startnumasteroids; i++)
	{
		rock.push(new meteor(5));
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
		text("Score: " + score, 50, 50, [100], [100])
		text("Lives: " + ship.lives, 50, 80, [100], [100])
		fill(255, 255, 255);
		textSize(20);
  		textAlign(CENTER, CENTER);

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

		if (!rock.length && !gamePause) {
			gamePause = true;
			nextLevel();
		}
		if (counter >= 50 && ship.active == false && !gamePause)
		{
			gamePause = true;
			if (ship.lives >= 1) {
				ship.reset();
				ship.lives -= 1;
				gamePause = false;
			}
			else {
				gameStatus();
			}
		}
		counter++;
	}
}

function keypress()
{
	if (keyIsDown(13)) {
		document.querySelector("#startGame").style.display = 'none';
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
				if (rock[j].dead()) {
					
					rock.splice(j, 1);
					bullets.splice(i, 1);
					score += 1;
					console.log(score);
				}
				else {
					let newasteroids = rock[j].break();
					rock = rock.concat(newasteroids);
					console.log(rock[j].lives);
					rock.splice(j, 1);
					bullets.splice(i,1);
					score += 1;
					console.log(score);
				}
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

const sleep = async(timeoutDurationMs) => {
	await new Promise((res) => {return setTimeout(res, timeoutDurationMs)});
}

const nextLevel = async() => {
	if (!rock.length) {
		await sleep(5000);
		startAst[0] = startAst[0] + 2;
		startAst[1] = startAst[1] + 2;
		startnumasteroids = floor(random(startAst[0],startAst[1]));
		for (let i = 0; i < startnumasteroids; i++)
		{
			rock.push(new meteor(6));
		}
		gamePause = false;
	}
}

const gameStatus = () => {
	// Whatever I need to do when the game ends...
	if (ship.lives > 0) {
		return;
	}
	else {
		ship.active = false; 
		gameStat = false;
		// Print some game over message and restart the game from 0? 
	}
}