import { Game } from "./Game";
import { GamepadInputs } from "./GamepadInputs";
import { VisibleObject } from "./VisibleObject";
import { Direction } from "./Direction";

export class Player implements VisibleObject {
	facing: Direction = Direction.Right;
	speed: number = 3;

	constructor(
		private x: number,
		private y: number,
		private color: string,
		private game: Game
	) {

	}

	update(inputs: GamepadInputs): void {
		if (inputs.a.pressed) {
			console.log("A");
			this.attack(this.game);
		}

		if (inputs.b.pressed) {
			this.color = "red";
		} else if (inputs.x.pressed) {
			this.color = "blue";
		} else if (inputs.y.pressed) {
			this.color = "yellow";
		}

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
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, 20, 20);
		// TODO: Replace with drawing a real character

		ctx.fillStyle = "orange";
		switch (this.facing) {
			case Direction.Up:
				ctx.fillRect(this.x, this.y, 20, 2);
				break;
			case Direction.Down:
				ctx.fillRect(this.x, this.y + 18, 20, 2);
				break;
			case Direction.Left:
				ctx.fillRect(this.x, this.y, 2, 20);
				break;
			case Direction.Right:
				ctx.fillRect(this.x + 18, this.y, 2, 20);
				break;
		}
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
