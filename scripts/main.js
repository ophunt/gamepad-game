Game = {};
Game.inputs = {};

function setup() {
	Game.canvas = document.getElementById("canvas");
	Game.ctx = canvas.getContext("2d");

	setCanvasSize();

	Game.player = new Player(10, 10, 100, 100, "black");

	window.requestAnimationFrame(gameLoop);
}

function setCanvasSize() {
	Game.canvas.width = window.innerWidth - 10;
	Game.canvas.height = window.innerHeight - 10;

	Game.width = Game.canvas.width;
	Game.height = Game.canvas.height;
}

window.addEventListener("resize", setCanvasSize);

function gameLoop() {
	clearCanvas();

	updateInputs();
	Game.player.update(Game.inputs, Game);

	Game.player.draw(Game.ctx);

	Game.player.move(Game);

	window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
	Game.ctx.fillStyle = "white";
	Game.ctx.fillRect(0, 0, Game.width, Game.height);
}

function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
	return b == 1.0;
}

function constrain(min, n, max) {
	return Math.min(Math.max(min, n), max);
}

function updateInputs() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (!gamepads || !gamepads[0]) {
		return;
	}

	var gp = gamepads[0];

	Game.inputs.a = buttonPressed(gp.buttons[0]);
	Game.inputs.b = buttonPressed(gp.buttons[1]);
	Game.inputs.x = buttonPressed(gp.buttons[2]);
	Game.inputs.y = buttonPressed(gp.buttons[3]);
	Game.inputs.lb = buttonPressed(gp.buttons[4]);
	Game.inputs.rb = buttonPressed(gp.buttons[5]);
	Game.inputs.lt = buttonPressed(gp.buttons[6]);
	Game.inputs.rt = buttonPressed(gp.buttons[7]);
	Game.inputs.view = buttonPressed(gp.buttons[8]);
	Game.inputs.menu = buttonPressed(gp.buttons[9]);
	Game.inputs.ls = buttonPressed(gp.buttons[10]);
	Game.inputs.rs = buttonPressed(gp.buttons[11]);
	Game.inputs.up = buttonPressed(gp.buttons[12]);
	Game.inputs.down = buttonPressed(gp.buttons[13]);
	Game.inputs.left = buttonPressed(gp.buttons[14]);
	Game.inputs.right = buttonPressed(gp.buttons[15]);
	Game.inputs.left_x = gp.axes[0];
	Game.inputs.left_y = gp.axes[1];
	Game.inputs.right_x = gp.axes[2];
	Game.inputs.right_y = gp.axes[3];
}

setup();
