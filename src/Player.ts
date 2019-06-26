import { Game } from "./Game";
import { GamepadInputs } from "./GamepadInputs";
import { VisibleObject } from "./VisibleObject";
import { Direction } from "./Direction";

export class Player implements VisibleObject {
	facing: Direction = Direction.Right;

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
			dy++;
			this.facing = Direction.Up;
		} else if (inputs.dDown.pressed) {
			dy--;
			this.facing = Direction.Down;
		} else if (inputs.dRight.pressed) {
			dx++;
			this.facing = Direction.Right;
		} else if (inputs.dLeft.pressed) {
			dx--;
			this.facing = Direction.Left;
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
		this.x += dx;
		this.y -= dy;
	}

	attack(game: Game): void {
		;
	}
}
