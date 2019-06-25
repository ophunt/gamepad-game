import { Player } from "./Player";
import { GameObject } from "./gameObject";
import { VisibleObject } from "./visibleObject";
import { GamepadInputs } from "./GamepadInputs";

export class Game {
	private player: Player;
	private gamepad?: Gamepad;
	private inputs?: GamepadInputs;
	private gameObjects: GameObject[] = [];
	private visibleObjects: VisibleObject[] = [];

	constructor (
		private ctx: CanvasRenderingContext2D,
	) {
		this.player = new Player(10, 10, "red", this);
		this.visibleObjects.push(this.player);
		this.gameObjects.push(this.player);

		window.addEventListener("gamepadconnected", () => this.getGamepad())
	};

	private getGamepad = () => {
		let gamepads = navigator.getGamepads();
		if (gamepads.length > 0 && gamepads[0] !== null) {
			this.gamepad = <Gamepad>gamepads[0];
		}

		this.inputs = new GamepadInputs(<Gamepad>this.gamepad);
	}

	private updateInputs = (): boolean => {
		if (this.inputs) {
			(<GamepadInputs>this.inputs).update();
			return true;
		}
		return false;
	}

	private drawVisibleObjects = () => {
		for (let vObj of this.visibleObjects) {
			vObj.draw(this.ctx);
		}
	};

	private updateObjects = () => {
		if (this.updateInputs()) {
			for (let gObj of this.gameObjects) {
				gObj.update(<GamepadInputs>this.inputs);
			}
		}
	}

	private gameLoop = () => {
		this.updateObjects();
		this.drawVisibleObjects();

		requestAnimationFrame(this.gameLoop);
	};

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};
}
