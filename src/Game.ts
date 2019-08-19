import { Player } from "./Player";
import { GameObject } from "./gameObject";
import { VisibleObject } from "./visibleObject";
import { GamepadInputs } from "./GamepadInputs";
import { Enemy } from "./Enemy";

export class Game {
	private _ctx: CanvasRenderingContext2D;
	private _player: Player;
	private _enemy: Enemy;
	private _score: number;
	private _gamepad?: Gamepad;
	private _inputs?: GamepadInputs;
	private _gameObjects: GameObject[] = [];
	private _visibleObjects: VisibleObject[][] = [[], [], []];

	get enemy(): Enemy { return this._enemy; }
	set enemy(e: Enemy) {
		this._enemy = e; }

	get score(): number { return this._score; }
	set score(s: number) {
		this._score = s; }

	constructor (
		private canvas: HTMLCanvasElement,
	) {
		this._ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
		this.setCanvasSize();

		this._score = 0;

		this._player = new Player(50, 50, "red", this);
		this._visibleObjects[2].push(this._player);
		this._gameObjects.push(this._player);

		this._enemy = new Enemy("green", this);
		this._visibleObjects[1].push(this._enemy);
		this._gameObjects.push(this._enemy);

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
					this._gamepad = <Gamepad>gamepads[gamepadIndex];
					this._inputs = new GamepadInputs(<Gamepad>this._gamepad);
					return true;
				}
			}
		}
		return false;
	}

	private draw = () => {
		this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let priorityLevelArray of this._visibleObjects) {
			for (let vObj of priorityLevelArray) {
				vObj.draw(this._ctx);
			}
		}
	};

	private updateObjects = () => {
		if (this.getGamepad()) {
			for (let gObj of this._gameObjects) {
				gObj.update(<GamepadInputs>this._inputs);
			}
		}
	}

	private gameLoop = () => {
		this.updateObjects();
		this.draw();

		requestAnimationFrame(this.gameLoop);
	};

	public set_Score(n: number) {
		this._score = n;
	}

	public add_Score(n: number) {
		this._score += n;
		console.log("_Score: " + this._score);
	}

	public main(): void {
		console.log("Game loaded!");

		requestAnimationFrame(this.gameLoop);
	};
}
