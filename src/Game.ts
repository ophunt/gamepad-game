import { Player } from "./Player";
import { GameObject } from "./gameObject";
import { VisibleObject } from "./visibleObject";
import { GamepadInputs } from "./GamepadInputs";

export class Game {
	private player: Player;
	private gamepad: Gamepad;
	private inputs: GamepadInputs;
	private gameObjects: GameObject[] = [];
	private visibleObjects: VisibleObject[] = [];

	constructor (
		private ctx: CanvasRenderingContext2D,
	) {
		this.player = new Player(10, 10, "red", this);
		this.gamepad = new Gamepad();
		this.inputs = new GamepadInputs(this.gamepad);
		this.visibleObjects.push(this.player);
		this.gameObjects.push(this.player);
	};

	private updateInputs = () => {

	}

	private drawVisibleObjects = () => {
		for (let vObj of this.visibleObjects) {
			vObj.draw(this.ctx);
		}
	};

	private updateObjects = () => {
		this.updateInputs();
		for (let gObj of this.gameObjects) {
			gObj.update(this.inputs);
		}
	}

	private gameLoop = () => {
		this.drawVisibleObjects();
		this.updateObjects();

		requestAnimationFrame(this.gameLoop);
	};

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};
}
