import { Player } from "./Player";
import { GameObject } from "./gameObject";
import { VisibleObject } from "./visibleObject";
import { GamepadInputs } from "./GamepadInputs";
import { Enemy } from "./Enemy";

export class Game {
	private ctx: CanvasRenderingContext2D;
	private player: Player;
	public enemy: Enemy;
	private gamepad?: Gamepad;
	private inputs?: GamepadInputs;
	private gameObjects: GameObject[] = [];
	private visibleObjects: VisibleObject[][] = [[], [], []];

	constructor (
		private canvas: HTMLCanvasElement,
	) {
		this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
		this.setCanvasSize();

		this.player = new Player(50, 50, "red", this);
		this.visibleObjects[2].push(this.player);
		this.gameObjects.push(this.player);

		this.enemy = new Enemy(400, 400, "green", this);
		this.visibleObjects[1].push(this.enemy);
		this.gameObjects.push(this.enemy);

		window.addEventListener("gamepadconnected", () => this.getGamepad())
	};

	public setCanvasSize() {
		this.canvas.width = window.innerWidth - 10;
		this.canvas.height = window.innerHeight - 10;
	};

	private getGamepad = () => {
		let gamepads = navigator.getGamepads();
		if (gamepads.length > 0 && gamepads[0] !== null) {
			this.gamepad = <Gamepad>gamepads[0];
		}

		this.inputs = new GamepadInputs(<Gamepad>this.gamepad);
	};

	private updateInputs = (): boolean => {
		if (this.inputs) {
			let gamepads = navigator.getGamepads();
			if (gamepads.length > 0 && gamepads[0] !== null) {
				this.gamepad = <Gamepad>gamepads[0];
			}

			this.inputs = new GamepadInputs(<Gamepad>this.gamepad);
			return true;
		}
		return false;
	}

	private draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let priorityLevelArray of this.visibleObjects) {
			for (let vObj of priorityLevelArray) {
				vObj.draw(this.ctx);
			}
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
		this.draw();

		requestAnimationFrame(this.gameLoop);
	};

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};

	public getCanvasSize(): number[] {
		return [this.canvas.width, this.canvas.height];
	};
}
