import { GamepadInputs } from "./GamepadInputs";

class Player {
	facing: Direction = Direction.Right;

	constructor(
		public x: number,
		public y: number,
		public color: string) {
	}

	update(inputs: GamepadInputs, game: Game) {
		if (inputs.a) {
			this.attack(game);
		}

		if (inputs.b) {
			this.color = "red";
		} else if (inputs.x) {
			this.color = "blue";
		} else if (inputs.y) {
			this.color = "yellow";
		}
	}

	draw(ctx: any) {
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

	move(game: Game, direction: Direction) {
		let newTile: Tile;

	}

	attack(game: Game) {
		;
	}
}
