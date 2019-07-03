import { Game } from "./Game";
import { GamepadInputs } from "./GamepadInputs";
import { VisibleObject } from "./VisibleObject";
import { Direction } from "./Direction";

export class Player implements VisibleObject {
	private static minRadius = 50;
	private static maxRadius = 200;

	private facing: Direction = Direction.Right;
	private speed: number = 3;
	private radius: number = 50;
	private leftAngle: number = 0;
	private rightAngle: number = Math.PI;

	constructor(
		private x: number,
		private y: number,
		private color: string,
		private game: Game
	) {

	}

	update(inputs: GamepadInputs): void {
		// Determine attack
		if (inputs.a.pressed) {
			console.log("A");
			this.attack(this.game);
		}

		// Determine color
		if (inputs.b.pressed) {
			this.color = "red";
		} else if (inputs.x.pressed) {
			this.color = "blue";
		} else if (inputs.y.pressed) {
			this.color = "yellow";
		}

		// Calculate movement
		let dx: number = 0;
		let dy: number = 0;
		if (inputs.dUp.pressed) {
			dy--;
			this.facing = Direction.Up;
		} else if (inputs.dDown.pressed) {
			dy++;
			this.facing = Direction.Down;
		} else if (inputs.dRight.pressed) {
			dx++;
			this.facing = Direction.Right;
		} else if (inputs.dLeft.pressed) {
			dx--;
			this.facing = Direction.Left;
		} else if (Math.abs(inputs.leftXAxis.value) > 0.15 || Math.abs(inputs.leftYAxis.value) > 0.15) {
			if (Math.abs(inputs.leftXAxis.value) > 0.15) {
				dx = inputs.leftXAxis.value;
			}
			if (Math.abs(inputs.leftYAxis.value) > 0.15) {
				dy = inputs.leftYAxis.value;
			}
			if (Math.abs(dx) > Math.abs(dy)) {
				this.facing = dx > 0 ? Direction.Right : Direction.Left;
			} else {
				this.facing = dy > 0 ? Direction.Down : Direction.Up;
			}
		}
		this.move(dx, dy);

		// Determine circle radius
		if (inputs.leftTrigger.value > 0 || inputs.rightTrigger.value > 0) {
			this.radius += inputs.rightTrigger.value - inputs.leftTrigger.value;
			this.radius = Math.max(Player.minRadius, Math.min(this.radius, Player.maxRadius))
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		let playerSide = 50;
		let facingSide = 10;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, playerSide, playerSide);
		// TODO: Replace with drawing a real character

		// Draw way the player is facing
		ctx.fillStyle = "orange";
		switch (this.facing) {
			case Direction.Up:
				ctx.fillRect(this.x, this.y, playerSide, facingSide);
				break;
			case Direction.Down:
				ctx.fillRect(this.x, this.y + playerSide - facingSide, playerSide, facingSide);
				break;
			case Direction.Left:
				ctx.fillRect(this.x, this.y, facingSide, playerSide);
				break;
			case Direction.Right:
				ctx.fillRect(this.x + playerSide - facingSide, this.y, facingSide, playerSide);
				break;
		}

		// Draw the circle
		ctx.beginPath();
		ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius, 0, 2*Math.PI);
		ctx.stroke();

		// Draw the arc
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius + 4, this.leftAngle, this.rightAngle);
		ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius - 4, this.rightAngle, this.leftAngle, true);
		ctx.closePath();
		ctx.fill();
	}

	move(dx: number, dy: number): void {
		dx *= this.speed;
		dy *= this.speed;

		let c = Math.sqrt(dx*dx + dy*dy);
		if (c*c > this.speed*this.speed) {
			c /= this.speed;
			dx /= c;
			dy /= c;
		}

		this.x += dx;
		this.y += dy;
	}

	attack(game: Game): void {
		;
	}
}
