import { Player } from "./Player";
import { VisibleObject } from "./visibleObject";

export class Game {
	private player: Player;
	private visibleObjects: VisibleObject[] = [];

	constructor (
		private ctx: CanvasRenderingContext2D,
	) {
		this.player = new Player(10, 10, "red", this);
		this.visibleObjects.push(this.player);
	};

	private drawVisibleObjects = () => {
		for (let vObj of this.visibleObjects) {
			vObj.draw(this.ctx);
		}
	};

	private gameLoop = () => {
		this.drawVisibleObjects();

		requestAnimationFrame(this.gameLoop);
	};

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};
}
