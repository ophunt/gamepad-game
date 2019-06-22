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
		if (inputs.a) {
			this.attack(this.game);
		}

		if (inputs.b) {
			this.color = "red";
		} else if (inputs.x) {
			this.color = "blue";
		} else if (inputs.y) {
			this.color = "yellow";
		}
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

	move(game: Game, direction: Direction): void {

	}

	attack(game: Game): void {
		;
	}
}
