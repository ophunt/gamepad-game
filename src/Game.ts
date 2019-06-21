import { Player } from "./Player";

export class Game {
	private player: Player;

	constructor (
		public ctx: CanvasRenderingContext2D,
	) {
		this.player = new Player(10, 10, "red", this);
	};

	main() {
		this.player.draw(this.ctx);
		console.log("Game loaded!");
	};
}
