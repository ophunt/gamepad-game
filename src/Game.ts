import { Player } from "./Player";
import { GameObject } from "./gameObject";
import { VisibleObject } from "./visibleObject";
import { GamepadInputs } from "./GamepadInputs";
import { Enemy } from "./Enemy";

export class Game {
	private ctx: CanvasRenderingContext2D;
	private player: Player;
	public enemy: Enemy;
	private score: number;
	private gamepad?: Gamepad;
	private inputs?: GamepadInputs;
	private gameObjects: GameObject[] = [];
	private visibleObjects: VisibleObject[][] = [[], [], []];

	constructor (
		private canvas: HTMLCanvasElement,
	) {
		this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
		this.setCanvasSize();

		this.score = 0;

		this.player = new Player(50, 50, "red", this);
		this.visibleObjects[2].push(this.player);
		this.gameObjects.push(this.player);

		this.enemy = new Enemy("green", this);
		this.visibleObjects[1].push(this.enemy);
		this.gameObjects.push(this.enemy);

		window.addEventListener("gamepadconnected", () => this.getGamepad())
	};

	public setCanvasSize(): void {
		this.canvas.width = window.innerWidth - 10;
		this.canvas.height = window.innerHeight - 10;
	};

	public getCanvasSize(): number[] {
		return [this.canvas.width, this.canvas.height];
	};

	private getGamepad = (): boolean => {
		let gamepads = navigator.getGamepads();
		if (gamepads.length > 0) {
			for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
				if (gamepads[gamepadIndex] !== null) {
					this.gamepad = <Gamepad>gamepads[gamepadIndex];
					this.inputs = new GamepadInputs(<Gamepad>this.gamepad);
					return true;
				}
			}
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
		if (this.getGamepad()) {
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

	public setScore(n: number) {
		this.score = n;
	}

	public addScore(n: number) {
		this.score += n;
		console.log("Score: " + this.score);
	}

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};
}
